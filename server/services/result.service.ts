import errorHandler from "../controllers/error.controller";
import { Context } from "../types/context";
import ResultModel, { Result } from "../models/form.model";
import deserializeUser from "../middleware/deserializeUser";
import { OptionsType, setCookie } from "cookies-next";
import { resultCookieOptions } from "../utils/constants";

export default class ResultService {
  async createResult(
    input: Partial<Result>,
    { req, res }: Context
  ): Promise<{ status: string; result: Result }> {
    try {
      const result = await ResultModel.create({ ...input });
      setCookie("answer_received", "true", {
        req,
        res,
        ...resultCookieOptions,
        httpOnly: false,
      } as OptionsType);
      return {
        status: "success",
        result: {
          ...result.toJSON(),
        },
      };
    } catch (error) {
      errorHandler(error);
      throw new Error("Failed to create result");
    }
  }

  async getResults({ req, res }: Context) {
    const user = await deserializeUser(req, res);

    try {
      const ResultsQuery = await ResultModel.find();
      return {
        status: "success",
        totalResults: ResultsQuery.length,
        results: ResultsQuery,
      };
    } catch (error) {
      errorHandler(error);
      throw new Error("Failed to retrieve results");
    }
  }
}
