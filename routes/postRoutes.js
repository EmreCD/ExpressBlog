const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

function requireLogin(req, res, next) {
  if (!req.session || !req.session.user) {
    return res.redirect("/login");
  }

  next();
}

router.get("/new", requireLogin, postController.showNewPostPage);
router.post("/new", requireLogin, postController.createPost);

router.get("/", postController.getPostsPage);
router.get("/api/all", postController.listPosts);

module.exports = router;
