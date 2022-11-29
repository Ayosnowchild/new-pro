const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    author: { type: String, default: "" },
    title: { type: String, default: "" },
    image: { type: String, default: "" },
    content: { type: String, default: "" },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
