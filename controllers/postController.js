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

  // Burası değişti: Kullanıcı mesaj görmek yerine ana sayfaya yönlendiriliyor
  res.redirect("/"); 
}

module.exports = {
  showNewPostPage,
  createPost
};