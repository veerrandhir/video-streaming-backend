import { Router } from "express";

import { registerUser } from "../controllers/user.controller";

const router = Router();

router.route("/register").post(registerUser);
// router.route("/register").post(loginUser);

export default router;
// if we export default then we import on our own name
