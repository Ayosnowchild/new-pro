const express = require("express");
const server = express();
const port = process.env.PORT || 3600;
const consolidate = require("consolidate");
const path = require("path");

server.engine("html", consolidate.swig);
server.set("view engine", "html");
server.set("views", __dirname + "/views");

// middleware to read json reqbody
server.use(express.json());

// middleware to read forndata/urlencoded reqbody
server.use(
  express.urlencoded({
    extended: true,
  })
);
const database = [
  {
    id: 1,
    body: "small content",
    author: "ayo",
    date: Date.now(),
  },
];

// get index route
server.get("/", (req, res) => {
  try {
    // return res.render("index", {
    //   author: "Ayo Ubermensch",
    // });
    return res.status(200).json({
      message: "welcome",
    });
    // res.sendFile(path.join(__dirname, "views", "index.html"));
  } catch (err) {
    console.log(err.message);
  }
});

// get blog posts
server.get("/blog", (req, res) => {
  return res.status(200).json({
    message: "blog posts",
    data: database,
  });
});

// get single blog post
server.get("/blog/:id", (req, res) => {
  console.log(req.params);
  let blog = database.find((data) => data.id === Number(req.params.id));
  if (blog) {
    return res.status(200).json({
      message: "blog post found",
      data: blog,
    });
  }
  return res.status(404).json({ message: "no blog post found" });
});

// post a new blog
server.post("/blog", (req, res) => {
  console.log(req.body);
  const dataWithId = database.push({ id: database.length + 1, ...req.body });
  database.push(dataWithId);
  return res.status(200).json({
    message: "blog created",
    data: req.body,
  });
});

// update single post by id
server.put("/blog/:id", (req, res) => {
  let oldDataIndex = database.findIndex(
    (data) => data.id === Number(req.params.id)
  );

  console.log(oldDataIndex);

  if (oldDataIndex >= 0) {
    let oldData = database[oldDataIndex];
    let newData = { id: oldData.id, ...req.body };
    database[oldDataIndex] = newData;
    return res.status(200).json({
      message: "post updated",
      data: oldData,
    });
  }
  return res.status(400).json({
    message: "post not found",
  });
});

// delete single post by id
server.delete("/blog/:id", (req, res) => {
  let index = database.findIndex((data) => data.id === Number(req.params.id));

  if (index >= 0) {
    database = database.slice(0, index);
    return res.status(204).json({
      message: " post deleted",
    });
  }
  return res.status(404).json({
    message: "post not found",
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
// server.get("/user", (req, res) => {
//   return res.json({
//     author: "Ayo Ubermensch",
//     message: "i choose me",
//   });
// });
