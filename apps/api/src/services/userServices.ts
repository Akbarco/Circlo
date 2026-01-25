import { isEmailExist } from "../repositories/userRepositorie";
import { SignUpValues } from "../utils/schema/user";

export const signUp = async (data: SignUpValues, file: Express.Multer.File) =>{
  const ifEmailExist = await isEmailExist(data.email)
  
}