import { object, string, TypeOf } from "zod";

export const CreateSessionSchema = object({
  body: object({
    email: string({
      required_error: "Email Name Is Required",
    }).email("Enter a valid email"),
    password: string({
      required_error: "Password Name Is Required",
    }).min(6, "Invalid Password or Email"),
  }),
});

export type CreateSessionInput = TypeOf<typeof CreateSessionSchema>["body"];
