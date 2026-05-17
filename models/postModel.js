const fs = require("fs");
const path = require("path");

const postsPath = path.join(__dirname, "../data/posts.json");

// posts.json dosyasındaki bütün blog yazılarını okur.
function getPosts() {
  const data = fs.readFileSync(postsPath, "utf-8");
  return JSON.parse(data);
}

// Yeni blog yazısını var olan yazıların sonuna ekler.
// id alanı için Date.now() kullanılır, createdAt alanı Türkçe tarih formatında tutulur.
function addPost(post) {
  const posts = getPosts();

  const newPost = {
    id: Date.now(),
    title: post.title,
    content: post.content,
    author: post.author || "Anonim",
    createdAt: new Date().toLocaleString("tr-TR")
  };

  posts.push(newPost);
  fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));

  return newPost;
}

module.exports = {
  getPosts,
  addPost
};
