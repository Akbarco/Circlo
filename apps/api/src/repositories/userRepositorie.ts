import { prisma } from "../lib/prisma";

export const isEmailExist = async (email: string) => {
  return await prisma.user.count({
    where: {
      email: email,
    },
  });
};
