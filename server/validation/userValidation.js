import { body } from "express-validator";

export const userCreateValidation = [
  body("nickname", "User name must be contain form 3 to 20 symbols").isLength({
    min: 3,
    max: 20,
  }),
  body("password", "Password must contain at least 8 characters").isLength({
    min: 8,
  }),
  body("email", "Email is not valid").isEmail(),
];

export const userLoginValidation = [
  body("password", "Password must contain at least 8 characters").isLength({
    min: 8,
  }),
  body("email", "Email is not valid").isEmail(),
];
