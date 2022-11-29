const mongoose = require("mongoose");
const { Post } = require("../models");

const getBasePath = (req, res) => {
  res.status(200).json({
    message: "hello from my api",
  });
};

const createPost = async (req, res) => {
  try {
    let post = await Post.create(req.body);
    // let post = new Post(req.body);
    // await post.save();
    return res.status(201).json({
      message: "post created",
      post,
    });
  } catch (err) {
    return res.status(500).json({
      message: "server error",
    });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    let posts = await Post.find({});
    return res.status(200).json({
      message: "posts fetched",
      posts,
    });
  } catch (err) {
    return res.status(500).json({
      message: "server error",
    });
  }
};
// const getSingleBlog = async (req, res) => {
//     try {
//         let post = await Post.find({ _id: req.params.id });
//         return res.status(200).json({
//           message: "post fetched",
//           post,
//         });
//       } catch (err) {
//         return res.status(500).json({
//           message: "server error",
//         });
//       }
// }

// const updateSinglePost = async (req, res) => {
//     try {
//         let updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body);
//         return res.status(200).json({
//           message: "post updated",
//           updatedPost,
//         });
//       } catch (err) {
//         return res.status(500).json({
//           message: "server error",
//         });
//       }
// }

// const deletePost = async (req,res) => {
//     try {
//         let delPost = await Post.deleteOne({ _id: req.params.id });
//         return res.status(204).json({
//           message: " post deleted",
//           delPost,
//         });
//       } catch (err) {
//         return res.status(500).json({
//           message: "server error",
//         });
//       }
// }

const getSingleBlog = async (req, res) => {
  try {
    let post = await Post.findOne({ _id: req.params.blogId });
    if (!post) {
      return res.status(404).json({ message: "post does not exist" });
    }
    return res.status(200).json({
      message: "post fetched",
      post,
    });
  } catch (err) {
    return res.status(500).json({
      message: "server error",
    });
  }
};

const updateSinglePost = async (req, res) => {
  try {
    let post = await Post.findById(req.params.blogId);
    if (!post) {
      return res.status(404).json({
        message: "post does not exist",
      });
    }
    const { author, content, title, image } = req.body;
    post.author = author;
    post.content = content;
    post.title = title;
    post.image = image;
    await post.save();
    return res.status(200).json({
      message: "post updated successfully",
      post,
    });
  } catch (err) {
    return res.status(500).json({
      message: "server error",
    });
  }
};

const deletePost = async (req, res) => {
  try {
    let post = await Post.findByIdAndDelete(req.params.blogId);
    if (!post) {
      return res
        .status(404)
        .json({ message: "post does not exist, cannot be deleted" });
    }
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({
      message: "server error",
    });
  }
};

const notFoundController = (req, res) => {
  res.status(400).json({
    message: "page not found",
  });
};

module.exports = {
  getBasePath,
  createPost,
  getAllBlogs,
  getSingleBlog,
  deletePost,
  updateSinglePost,
  notFoundController,
};
