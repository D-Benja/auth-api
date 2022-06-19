import UserModel, { User } from "../models/user.model";

export async function createUser(input: Partial<User>) {
  return UserModel.create(input);
}

export async function FindUserById(id: string) {
  return UserModel.findById(id);
}
