import { body } from "express-validator";

export const postValidation = [
  body("title", "Title is required").isLength({
    min: 1,
    max: 20,
  }),
  body("subtitle", "Subtitle is required").isLength({
    min: 1,
    max: 20,
  }),
  body("link", "Link is required").isURL(),
  body("image", "Image is required"),
];
