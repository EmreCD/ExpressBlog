const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.get("/new", postController.showNewPostPage);
router.post("/new", postController.createPost);

router.get("/", postController.getPostsPage);
router.get("/api/all", postController.listPosts);

module.exports = router;
