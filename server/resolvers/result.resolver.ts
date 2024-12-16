import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import {
ResultInput,
ResultListResponse,
ResultResponse
} from '../schemas/result.schema';
import ResultService from '../services/result.service';
import type { Context } from '../types/context';

@Resolver()
export default class ResultResolver {
  constructor(private resultService: ResultService) {
    this.resultService = new ResultService();
  }

  @Mutation(() => ResultResponse)
  async createResult(@Arg('input') input: ResultInput, @Ctx() ctx: Context) {
    return this.resultService.createResult(input, ctx);
  }

  @Query(() => ResultListResponse)
  async getResults(
    @Ctx() ctx: Context
  ) {
    return this.resultService.getResults(ctx);
  }
}