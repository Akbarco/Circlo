import * as userRepositories from "../repositories/userRepositorie";
import { AppError } from "../utils/AppError";
import { successResponse } from "../utils/response";
import { signInSchema, SignUpValues } from "../utils/schema/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async (data: SignUpValues, file: Express.Multer.File) => {
  const ifEmailExist = await userRepositories.isEmailExist(data.email);

  if (ifEmailExist) {
    throw new AppError("Email already exist", 409);
  }

  const user = await userRepositories.createUser(
    {
      ...data,
      password: bcrypt.hashSync(data.password, 12),
    },
    file.filename,
  );

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET ?? "", {
    expiresIn: "1d",
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    photo: user.photo_url,
    token,
  };
};

export const signIN = async (datas: signInSchema) => {
  const emailExist = await userRepositories.isEmailExist(datas.email);

  if (!emailExist) {
    throw new AppError("Email not registered", 404);
  }

  const user = await userRepositories.finduserByEmail(datas.email);

  if (!bcrypt.compareSync(datas.password, user.password)) {
    throw new AppError("Email and password incorrect", 400);
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET ?? "", {
    expiresIn: "1d",
  });
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    photo: user.photo_url,
    token,
  };
};
