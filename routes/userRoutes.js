const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// Kayıt sayfası ve kayıt formu gönderimi.
router.get('/register', userController.getRegisterPage);
router.post('/register', userController.registerUser);

// Giriş sayfası, giriş formu gönderimi ve çıkış işlemi.
router.get('/login', userController.getLoginPage);
router.post('/login', userController.loginUser);
router.get('/logout', userController.logoutUser);

// Şifre sıfırlama sayfası ve form gönderimi.
router.get('/forgot-password', userController.getForgotPasswordPage);
router.post('/forgot-password', userController.resetPassword);

module.exports = router;
