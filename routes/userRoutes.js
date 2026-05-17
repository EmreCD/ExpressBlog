const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/register', userController.getRegisterPage);
router.post('/register', userController.registerUser);

router.get('/login', userController.getLoginPage);
router.post('/login', userController.loginUser);
router.get('/logout', userController.logoutUser);

router.get('/forgot-password', userController.getForgotPasswordPage);
router.post('/forgot-password', userController.resetPassword);

module.exports = router;
