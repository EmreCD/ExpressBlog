const express = require('express');
const session = require('express-session');
const path = require('path');

const userRoutes = require('./routes/userRoutes');
const postRoutes = require("./routes/postRoutes");

// Uygulamanın ana Express nesnesi burada oluşturulur.
// Bütün middleware'ler, route bağlantıları ve ana sayfa bu dosyada toplanır.
const app = express();
const PORT = 3000;

// Formlardan gelen application/x-www-form-urlencoded verileri req.body içine alır.
// Login, register ve post oluşturma formları bu middleware sayesinde okunur.
app.use(express.urlencoded({ extended: true }));

// JSON gövdesi ile gelen istekleri okuyabilmek için kullanılır.
// Bu projede API tarafı basit olsa da Express uygulamalarında standart bir ayardır.
app.use(express.json());

// public klasöründeki CSS gibi statik dosyaları tarayıcıya açar.
// Örneğin /style.css isteği public/style.css dosyasına gider.
app.use(express.static(path.join(__dirname, 'public')));

// Session ayarı kullanıcı giriş bilgisini istekler arasında tutmak için kullanılır.
// Login olunca req.session.user set edilir, logout olunca session yok edilir.
app.use(session({
  secret: 'expressblog-secret-key',
  resave: false,
  saveUninitialized: false
}));

// Kullanıcı işlemleri kök path üzerinden bağlanır:
// /register, /login, /logout, /forgot-password gibi adresler userRoutes içindedir.
app.use('/', userRoutes);

// Blog yazısı işlemleri /posts altında gruplanır.
// Örneğin /posts, /posts/new ve /posts/api/all bu route dosyasına gider.
app.use('/posts', postRoutes);

// Ana sayfa isteği.
// Kullanıcı giriş yaptıysa menüde New Post ve Logout görünür,
// giriş yapmadıysa Register/Login/Reset Password bağlantıları görünür.
app.get('/', (req, res) => {
  const isLoggedIn = Boolean(req.session.user);
  const navLinks = isLoggedIn
    ? `
        <a href="/">Home</a>
        <a href="/posts">Posts</a>
        <a href="/posts/new">New Post</a>
        <a href="/logout">Logout</a>
      `
    : `
        <a href="/">Home</a>
        <a href="/register">Register</a>
        <a href="/login">Login</a>
        <a href="/posts">Posts</a>
        <a href="/forgot-password">Reset Password</a>
      `;

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>ExpressBlog</title>
      <link rel="stylesheet" href="/style.css">
    </head>
    <body>
      <nav>
        ${navLinks}
      </nav>

      <div class="container">
        <h1>ExpressBlog</h1>
        <p>Yazılım Mühendisliği dersi kapsamında Node.js ve Express ile geliştirilmiş basit blog sitesi.</p>
      </div>
    </body>
    </html>
  `);
});

// Sunucuyu belirtilen portta başlatır.
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
