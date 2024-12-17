import {
    getModelForClass,
    ModelOptions,
    prop,
    Severity,
  } from '@typegoose/typegoose';
  
  @ModelOptions({
    schemaOptions: {
      timestamps: true,
    },
    options: {
      allowMixed: Severity.ALLOW,
    },
  })
  export class Result {
    readonly _id: string;
  
    @prop({ required: true, select: true })
    breed_id: number;
  
    @prop({ required: true, select: true })
    district: number;
  
    @prop({ required: true })
    name: string;
  
    @prop({ required: true, select: true })
    is_male: boolean;
  
    @prop({ required: true })
    age: number;
  }
  
  const ResultModel = getModelForClass<typeof Result>(Result);
  export default ResultModel;