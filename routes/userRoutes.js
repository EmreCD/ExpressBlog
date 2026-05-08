const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// --- KAYIT (REGISTER) ROTALARI ---
router.get('/register', userController.getRegisterPage);
router.post('/register', userController.registerUser);

// ---   GİRİŞ (LOGIN) VE ÇIKIŞ (LOGOUT) ROTALARI ---
router.get('/login', userController.getLoginPage);
router.post('/login', userController.loginUser);
router.get('/logout', userController.logoutUser);

// --- ŞİFRE SIFIRLAMA ROTALARI ---
router.get('/forgot-password', userController.getForgotPasswordPage);
router.post('/forgot-password', userController.resetPassword);

module.exports = router;