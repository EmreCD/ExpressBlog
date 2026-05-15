const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.get("/new", postController.showNewPostPage);
router.post("/new", postController.createPost);

module.exports = router;
