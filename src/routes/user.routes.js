import { Router } from "express";

import { registerUser } from "../controllers/user.controller";

import { upload } from "../middlewares/multer.middleware";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser,
);
// router.route("/register").post(loginUser);

export default router;
// if we export default then we import on our own name
