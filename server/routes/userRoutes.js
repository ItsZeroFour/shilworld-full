import express from "express";
import { UserControllers } from "../controllers/index.js";
import checkAuth from "../utils/chackAuth.js";
import {
  userCreateValidation,
  userLoginValidation,
} from "../validation/userValidation.js";

const router = express.Router();

router.post("/create", userCreateValidation, UserControllers.createUser);
router.post("/login", userLoginValidation, UserControllers.loginUser);
router.get("/get", checkAuth, UserControllers.getUser);
router.get("/confirm/:token", UserControllers.confirmEmail);
router.get("/confirm2FA/:token", UserControllers.confirm2FA);
router.post("/sendLetter", checkAuth, UserControllers.sendLetter);
router.post("/send2FALetter", checkAuth, UserControllers.send2FALetter);
router.post("/sendCode", UserControllers.sendCode);
router.post(
  "/resetPasswordTokenEmail",
  UserControllers.resetPasswordTokenEmail
);
router.post("/resetPassword/:token", UserControllers.resetPassword);

export default router;
