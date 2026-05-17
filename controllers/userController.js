const path = require('path');
const User = require('../models/userModel');

function appUrl(req, pathname) {
  return `${req.app.locals.basePath}${pathname}` || pathname;
}

exports.getRegisterPage = (req, res) => {
  if (req.session.user) {
    return res.redirect(appUrl(req, '/posts'));
  }

  res.sendFile(path.join(__dirname, '../views/register.html'));
};

exports.registerUser = (req, res) => {
  if (req.session.user) {
    return res.redirect(appUrl(req, '/posts'));
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.send('Please fill all fields.');
  }

  const existingUser = User.findByUsername(username);

  if (existingUser) {
    return res.send('This username is already taken.');
  }

  User.save({
    username,
    password
  });

  res.send(`User ${username} registered successfully!`);
};

exports.getLoginPage = (req, res) => {
  if (req.session.user) {
    return res.redirect(appUrl(req, '/posts'));
  }

  res.sendFile(path.join(__dirname, '../views/login.html'));
};

exports.loginUser = (req, res) => {
  if (req.session.user) {
    return res.redirect(appUrl(req, '/posts'));
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.send('Lütfen kullanıcı adı ve şifrenizi girin.');
  }

  const user = User.findByUsername(username);

  if (user && user.password === password) {
    req.session.user = { username: user.username };
    res.redirect(appUrl(req, '/posts')); 
  } else {
    res.status(401).send(`
      <!DOCTYPE html>
      <html lang="tr">
      <head>
        <meta charset="UTF-8">
        <title>Hata - ExpressBlog</title>
        <link rel="stylesheet" href="${appUrl(req, '/style.css')}">
      </head>
      <body>
        <div class="login-container" style="text-align: center; margin-top: 50px; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); width: 300px; margin-left: auto; margin-right: auto;">
          <h2 style="color: #dc3545; margin-bottom: 10px;">Hata</h2>
          <p style="margin-bottom: 25px; font-size: 16px;">Kullanıcı adı veya şifre yanlış!</p>
          <a href="${appUrl(req, '/login')}" style="background-color: #007BFF; color: white; display: inline-block; width: auto; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Giriş Sayfasına Dön</a>
        </div>
      </body>
      </html>
    `);
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Çıkış işlemi sırasında bir hata oluştu.');
    }
    res.redirect(appUrl(req, '/login'));
  });
};

exports.getForgotPasswordPage = (req, res) => {
  if (req.session.user) {
    return res.redirect(appUrl(req, '/posts'));
  }

  res.sendFile(path.join(__dirname, '../views/forgot-password.html'));
};

exports.resetPassword = (req, res) => {
  if (req.session.user) {
    return res.redirect(appUrl(req, '/posts'));
  }

  const { username, newPassword } = req.body;

  if (!username || !newPassword) {
    return res.send('Lütfen kullanıcı adınızı ve yeni şifrenizi girin.');
  }

  const userExists = User.findByUsername(username);

  if (!userExists) {
    return res.send(`
      <!DOCTYPE html>
      <html lang="tr">
      <head>
        <meta charset="UTF-8">
        <title>Hata - ExpressBlog</title>
        <link rel="stylesheet" href="${appUrl(req, '/style.css')}">
      </head>
      <body>
        <div class="login-container" style="text-align: center; margin-top: 50px; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); width: 300px; margin-left: auto; margin-right: auto;">
          <h2 style="color: #dc3545; margin-bottom: 10px;">Hata</h2>
          <p style="margin-bottom: 25px; font-size: 16px;">Böyle bir kullanıcı bulunamadı.</p>
          <a href="${appUrl(req, '/forgot-password')}" style="background-color: #6c757d; color: white; display: inline-block; width: auto; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Geri Dön</a>
        </div>
      </body>
      </html>
    `);
  }

  User.updatePassword(username, newPassword);

  res.send(`
    <!DOCTYPE html>
    <html lang="tr">
    <head>
      <meta charset="UTF-8">
      <title>Başarılı - ExpressBlog</title>
      <link rel="stylesheet" href="${appUrl(req, '/style.css')}">
    </head>
    <body>
      <div class="login-container" style="text-align: center; margin-top: 50px; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); width: 300px; margin-left: auto; margin-right: auto;">
        <h2 style="color: #28a745; margin-bottom: 10px;">Başarılı</h2>
        <p style="font-size: 16px; margin-bottom: 5px;">Şifreniz başarıyla güncellendi!</p>
        <p style="font-size: 14px; color: #666; margin-bottom: 25px;">Eski şifreniz artık geçersizdir.</p>
        <a href="${appUrl(req, '/login')}" style="background-color: #007BFF; color: white; display: inline-block; width: auto; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Yeni Şifrenizle Giriş Yapın</a>
      </div>
    </body>
    </html>
  `);
};
