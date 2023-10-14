import { validationResult } from "express-validator";
import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const { title, subtitle, link, image } = req.body;

    const newPost = new Post({
      title,
      subtitle,
      image,
      link,
    });

    await newPost.save();

    res.json(newPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to create post",
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    Post.findOneAndDelete({
      _id: postId,
    })
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({
            message: "Post not found",
          });
        }

        res.json({
          success: true,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Failed to delete post",
        });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to delete post",
    });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get products",
    });
  }
};

export const getOnePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.findById(postId);

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get products",
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;

    await Post.updateOne(
      { _id: postId },
      {
        title: req.body.title,
        subtitle: req.body.subtitle,
        image: req.body.image,
        link: req.body.link,
      }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to update product",
    });
  }
};
