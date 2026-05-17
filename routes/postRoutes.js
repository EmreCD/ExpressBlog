const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

// Post oluşturma işlemi sadece giriş yapan kullanıcılar için açık olmalıdır.
// Session yoksa kullanıcı login sayfasına yönlendirilir.
function requireLogin(req, res, next) {
  if (!req.session || !req.session.user) {
    return res.redirect("/login");
  }

  next();
}

// Yeni post formu ve formun kaydedildiği POST endpoint'i.
router.get("/new", requireLogin, postController.showNewPostPage);
router.post("/new", requireLogin, postController.createPost);

// Yazıları listeleyen sayfa ve bu sayfanın kullandığı JSON API endpoint'i.
router.get("/", postController.getPostsPage);
router.get("/api/all", postController.listPosts);

module.exports = router;
