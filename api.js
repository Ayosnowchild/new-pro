const express = require("express");
const mongoose = require("mongoose");
const api = express();
const port = 8000;
const {
  getBasePath,
  createPost,
  getAllBlogs,
  getSingleBlog,
  deletePost,
  updateSinglePost,
  notFoundController,
} = require("./controllers/post.controllers");
const AppStarter = require("./utils");

api.use(express.json());

// middleware to read formdata/urlencoded reqbody
api.use(
  express.urlencoded({
    extended: true,
  })
);

api.get("/", getBasePath);

api.post("/blog", createPost);

api.get("/blog", getAllBlogs);
// update single post by id
api.get("/blog/:blogId", getSingleBlog);

api.put("/blog/:blogId", updateSinglePost);

// delete single post by id

api.delete("/blog/:blogId", deletePost);

api.all("*", notFoundController);

api.listen(port, AppStarter);
