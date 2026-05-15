const fs = require("fs");
const path = require("path");

const postsPath = path.join(__dirname, "../data/posts.json");

function getPosts() {
  const data = fs.readFileSync(postsPath, "utf-8");
  return JSON.parse(data);
}

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
