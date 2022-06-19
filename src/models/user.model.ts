import {
  DocumentType,
  getModelForClass,
  modelOptions,
  pre,
  prop,
  Severity,
} from "@typegoose/typegoose";
import argon2d from "argon2";
import { v4 as uuidv4 } from "uuid";

@pre<User>("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const hashedPassword = await argon2d.hash(this.password);
  this.password = hashedPassword;

  return;
})
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class User {
  @prop({ required: true, unique: true, lowercase: true })
  email!: string;

  @prop({ required: true })
  firstName!: string;

  @prop({ required: true })
  lastName!: string;

  @prop({ required: true })
  password!: string;

  @prop({ required: true, default: () => uuidv4() })
  verificationCode!: string;

  @prop()
  passwordResetCode!: string | null;

  @prop({ default: false })
  verified!: boolean;

  async ValidatePassword(this: DocumentType<User>, candidatePassword: string) {
    try {
      return await argon2d.verify(this.password, candidatePassword);
    } catch (error) {
      return console.log(error);
    }
  }
}

const UserModel = getModelForClass(User);

export default UserModel;
