import express from "express";
import multer from "multer";
import { storageUserPhoto } from "../utils/multer";
import * as userController from "../controllers/userController";

const userRoute = express.Router();

const uploadPhoto = multer({
  storage: storageUserPhoto,
  fileFilter(req, file, callback) {
    if (file.mimetype.startsWith("image/")) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
});

userRoute.post(
  "/auth/sign-up",
  uploadPhoto.single("photo"),
  userController.signUp,
);

userRoute.post("/auth/sign-in", userController.signIN);

export default userRoute;
