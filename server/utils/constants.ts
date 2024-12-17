import { OptionsType } from "cookies-next";

export const accessTokenExpiresIn = 15;
export const refreshTokenExpiresIn = 60;
export const resultExpiresIn = 60;
let cookieOptions: OptionsType = {
  httpOnly: true,
  sameSite: "lax",
};

if (process.env.NODE_ENV === "production") {
  cookieOptions.secure = true;
}
const createCookieOptions = (expiresIn: number): OptionsType => ({
  ...cookieOptions,
  maxAge: expiresIn * 60,
  expires: new Date(Date.now() + expiresIn * 60 * 1000),
});

export const accessTokenCookieOptions =
  createCookieOptions(accessTokenExpiresIn);
export const refreshTokenCookieOptions = createCookieOptions(
  refreshTokenExpiresIn
);
export const resultCookieOptions = createCookieOptions(resultExpiresIn);
