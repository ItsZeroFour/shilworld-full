import express from "express";
import { PostControllers } from "../controllers/index.js";
import { postValidation } from "../validation/postValidation.js";
import checkAuth from "../utils/chackAuth.js";
import checkUserIsAdmin from "../utils/checkUserIsAdmin.js";

const router = express.Router();

router.post(
  "/create",
  checkAuth,
  checkUserIsAdmin,
  postValidation,
  PostControllers.createPost
);
router.get("/getAllPosts", PostControllers.getAllPosts);
router.delete(
  "/delete/:id",
  checkAuth,
  checkUserIsAdmin,
  PostControllers.deletePost
);
router.patch(
  "/update/:id",
  checkAuth,
  checkUserIsAdmin,
  PostControllers.updatePost
);
router.get("/getOnePost/:id", PostControllers.getOnePost);

export default router;
