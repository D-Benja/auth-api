"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserSchema = void 0;
const zod_1 = require("zod");
exports.CreateUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        firstName: (0, zod_1.string)({
            required_error: "First Name Is Required",
        }),
        lastName: (0, zod_1.string)({
            required_error: "Last Name Is Required",
        }),
        email: (0, zod_1.string)({
            required_error: "Email Name Is Required",
        }).email("Enter a valid email"),
        password: (0, zod_1.string)({
            required_error: "Password Name Is Required",
        }).min(6, "Password Must Be At Least 6 Characters"),
        passwordConfirmation: (0, zod_1.string)({
            required_error: "Password Confirmation Is Required",
        }),
    }).refine((data) => (data.password = data.passwordConfirmation), {
        message: "Password Confirmation Must Match Password",
        path: ["passwordConfirmation"],
    }),
});
