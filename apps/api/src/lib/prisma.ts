import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter }).$extends({
  result: {
    user: {
      photo_url: {
        needs: {
          photo: true,
        },
        compute(data) {
          if (data.photo) {
            return `${process.env.URL_ASSET_PHOTO}${data.photo}`;
          }
          return null;
        },
      },
    },
  },
});

export { prisma };
