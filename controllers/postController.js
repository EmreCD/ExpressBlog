const path = require("path");
const postModel = require("../models/postModel");

function showNewPostPage(req, res) {
  res.sendFile(path.join(__dirname, "../views/newPost.html"));
}

function createPost(req, res) {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.send("Baslik ve icerik bos birakilamaz.");
  }

  postModel.addPost({
    title,
    content,
    author: req.session && req.session.user ? req.session.user : "Anonim"
  });

  res.redirect("/"); 
}

function getPostsPage(req, res) {
  res.sendFile(path.join(__dirname, "../views/posts.html"));
}

function listPosts(req, res) {
  const posts = postModel.getPosts(); // Modeldeki fonksiyonu çağırdık
  res.json(posts);
}

module.exports = {
  showNewPostPage,
  createPost,
  getPostsPage,
  listPosts
};