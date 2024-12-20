import { AuthenticationError, ForbiddenError } from "apollo-server-micro";
import { OptionsType, setCookie } from "cookies-next";
import errorHandler from "../controllers/error.controller";
import deserializeUser from "../middleware/deserializeUser";
import { LoginInput } from "../schemas/user.schema";
import UserModel, { User } from "../models/user.model";
import { Context } from "../types/context";
import { disconnectDB } from "../utils/connectDB";
import redisClient from "../utils/connectRedis";
import { signJwt, verifyJwt } from "../utils/jwt";
import {
  accessTokenCookieOptions,
  accessTokenExpiresIn,
  refreshTokenCookieOptions,
  refreshTokenExpiresIn,
} from "../utils/constants";

// Cookie Options

async function findByEmail(email: string): Promise<User | null> {
  return UserModel.findOne({ email }).select("+password");
}

// Generate Tokens
function signTokens(user: User) {
  const userId: string = user._id.toString();
  const access_token = signJwt({ userId }, "accessTokenPrivateKey", {
    expiresIn: `${accessTokenExpiresIn}m`,
  });

  const refresh_token = signJwt({ userId }, "refreshTokenPrivateKey", {
    expiresIn: `${refreshTokenExpiresIn}m`,
  });

  redisClient.set(userId, JSON.stringify(user), {
    EX: refreshTokenExpiresIn * 60,
  });

  return { access_token, refresh_token };
}

export default class UserService {
  // Sign up a new user
  async signUpUser(input: Partial<User>) {
    try {
      const user = await UserModel.create(input);
      await disconnectDB();
      return {
        status: "success",
        user: user.toJSON(),
      };
    } catch (error: any) {
      if (error.code === 11000) {
        return new ForbiddenError("Email already exists");
      }
      errorHandler(error);
    }
  }

  // Login a user
  async loginUser(input: LoginInput, { req, res }: Context) {
    try {
      const message = "Invalid email or password";
      // 1. Find user by email
      const user = await findByEmail(input.email);
      await disconnectDB();

      if (!user) {
        return new AuthenticationError(message);
      }

      // 2. Compare passwords
      if (!(await UserModel.comparePasswords(user.password, input.password))) {
        return new AuthenticationError(message);
      }

      // 3. Sign JWT Tokens
      const { access_token, refresh_token } = signTokens(user);

      // 4. Add Tokens to Context
      setCookie("access_token", access_token, {
        req,
        res,
        ...accessTokenCookieOptions,
      } as OptionsType);
      setCookie("refresh_token", refresh_token, {
        req,
        res,
        ...refreshTokenCookieOptions,
      } as OptionsType);
      setCookie("logged_in", "true", {
        req,
        res,
        ...accessTokenCookieOptions,
        httpOnly: false,
      } as OptionsType);

      return {
        status: "success",
        access_token,
      };
    } catch (error) {
      errorHandler(error);
    }
  }

  // Get Authenticated User
  async getMe({ req, res, deserializeUser }: Context) {
    try {
      const user = await deserializeUser(req, res);
      return {
        status: "success",
        user: {
          ...user,
          id: user?._id,
        },
      };
    } catch (error) {
      errorHandler(error);
    }
  }

  // Refresh Access Token
  async refreshAccessToken({ req, res }: Context) {
    try {
      // Get the refresh token
      const { refresh_token } = req.cookies;

      // Validate the RefreshToken
      const decoded = verifyJwt<{ userId: string }>(
        refresh_token as string,
        "refreshTokenPublicKey"
      );

      if (!decoded) {
        throw new ForbiddenError("Could not refresh access token");
      }

      // Check if user's session is valid
      const session = await redisClient.get(decoded.userId);

      if (!session) {
        throw new ForbiddenError("User session has expired");
      }

      // Check if user exist and is verified
      const user = await UserModel.findById(JSON.parse(session)._id).select(
        "+verified"
      );
      await disconnectDB();

      if (!user || !user.verified) {
        throw new ForbiddenError("Could not refresh access token");
      }

      // Sign new access token
      const access_token = signJwt(
        { userId: user._id },
        "accessTokenPrivateKey",
        {
          expiresIn: `${accessTokenExpiresIn}m`,
        }
      );

      // Send access token cookie
      setCookie("access_token", access_token, {
        req,
        res,
        ...accessTokenCookieOptions,
      } as OptionsType);
      setCookie("logged_in", "true", {
        req,
        res,
        ...accessTokenCookieOptions,
        httpOnly: false,
      } as OptionsType);

      return {
        status: "success",
        access_token,
      };
    } catch (error) {
      errorHandler(error);
    }
  }

  // Logout User
  async logoutUser({ req, res }: Context) {
    try {
      const user = await deserializeUser(req, res);

      // Delete the user's session
      await redisClient.del(String(user?._id));

      // Logout user
      setCookie("access_token", "", { req, res, maxAge: -1 });
      setCookie("refresh_token", "", { req, res, maxAge: -1 });
      setCookie("logged_in", "", { req, res, maxAge: -1 });

      return true;
    } catch (error) {
      errorHandler(error);
    }
  }
}
