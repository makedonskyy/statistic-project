import { gql } from "@apollo/client";
import { z } from "zod";

export const RESULT = gql`
  mutation ($input: ResultInput!) {
    createResult(input: $input) {
      status
      result {
        breed_id
        district
        name
        is_male
        age
        createdAt
      }
    }
  }
`;

export const formSchema = z.object({
  district: z.number().int().positive(),
  name: z
    .string()
    .min(2, "Имя должно содержать минимум 2 символа")
    .max(255, "Имя не может быть более 255 символов"),
  is_male: z.boolean(),
  age: z
    .number()
    .int()
    .positive()
    .max(150, "Возраст не может быть более 150 лет"),
  breed_id: z.number().int().positive(),
});
