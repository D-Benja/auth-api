import { object, string, TypeOf } from "zod";

export const CreateUserSchema = object({
  body: object({
    firstName: string({
      required_error: "First Name Is Required",
    }),
    lastName: string({
      required_error: "Last Name Is Required",
    }),
    email: string({
      required_error: "Email Name Is Required",
    }).email("Enter a valid email"),
    password: string({
      required_error: "Password Name Is Required",
    }).min(6, "Password Must Be At Least 6 Characters"),
    passwordConfirmation: string({
      required_error: "Password Confirmation Is Required",
    }),
  }).refine((data) => (data.password = data.passwordConfirmation), {
    message: "Password Confirmation Must Match Password",
    path: ["passwordConfirmation"],
  }),
});

export const VerifyUserSchema = object({
  params: object({
    id: string(),
    verificationCode: string(),
  }),
});

export const ForgotPasswordSchema = object({
  body: object({
    email: string({
      required_error: "Email Name Is Required",
    }).email("Enter a valid email"),
  }),
});

export const ResetPasswordSchema = object({
  params: object({
    id: string(),
    passwordResetCode: string(),
  }),
  body: object({
    password: string({
      required_error: "A Password Is Required",
    }).min(6, "Password Must Be At Least 6 Characters"),
    passwordConfirmation: string({
      required_error: "Password Confirmation Is Required",
    }),
  }).refine((data) => (data.password = data.passwordConfirmation), {
    message: "Password Confirmation Must Match Password",
    path: ["passwordConfirmation"],
  }),
});

export type CreateUserInput = TypeOf<typeof CreateUserSchema>["body"];
export type VerifyUserInput = TypeOf<typeof VerifyUserSchema>["params"];
export type ForgotPasswordInput = TypeOf<typeof ForgotPasswordSchema>["body"];
export type ResetPasswordInput = TypeOf<typeof ResetPasswordSchema>;
