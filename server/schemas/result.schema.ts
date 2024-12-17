import { Max, MaxLength, Min, MinLength } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";

@InputType()
export class ResultInput {
  @Min(0, { message: "The value should be in the range 0-5" })
  @Max(5, { message: "The value should be in the range 0-5" })
  @Field(() => Number)
  breed_id: number;

  @Min(0, { message: "The value should be in the range 0-132" })
  @Max(132, { message: "The value should be in the range 0-132" })
  @Field(() => Number)
  district: number;

  @MinLength(2, { message: "Name must be at least 2 characters long" })
  @MaxLength(255, { message: "Name must be at most 255 characters long" })
  @Field(() => String)
  name: string;

  @Field(() => Boolean)
  is_male: boolean;

  @Min(0, { message: "The value should be in the range 0-128" })
  @Max(128, { message: "The value should be in the range 0-128" })
  @Field(() => Number)
  age: number;
}


@ObjectType()
export class ResultDataObj {
  @Field(() => String)
  readonly _id: string;

  @Field(() => Number)
  breed_id: number;

  @Field(() => Number)
  district: number;

  @Field(() => String)
  name: string;

  @Field(() => Boolean)
  is_male: boolean;

  @Field(() => Number)
  age: number;

  @Field(() => Date)
  createdAt: Date;
}

@ObjectType()
export class ResultResponse extends ResultDataObj {
  @Field(() => String)
  status: string;
  @Field(() => ResultDataObj)
  result: ResultDataObj;
}

@ObjectType()
export class ResultListResponse {
  @Field(() => String)
  status: string;

  @Field(() => Number)
  totalResults: number;

  @Field(() => [ResultDataObj])
  results: ResultDataObj[];
}
