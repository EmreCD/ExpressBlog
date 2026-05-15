const express = require('express');
const session = require('express-session');
const path = require('path');

const userRoutes = require('./routes/userRoutes');
const postRoutes = require("./routes/postRoutes");


const app = express();
const PORT = 3000;

// Form verilerini okumak için
app.use(express.urlencoded({ extended: true }));
// JSON formatındaki verileri okumak için (eklendi)
app.use(express.json());

// CSS gibi static dosyalar için
app.use(express.static(path.join(__dirname, 'public')));

// Session ayarı (Görev 3)
app.use(session({
  secret: 'nodeblogify-secret-key',
  resave: false,
  saveUninitialized: false // Güvenlik ve gereksiz session oluşumunu engellemek için false yapıldı
}));

// Route dosyaları
app.use('/', userRoutes);
app.use('/posts', postRoutes);


// Ana sayfa
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>NodeBlogify</title>
      <link rel="stylesheet" href="/style.css">
    </head>
    <body>
      <nav>
        <a href="/">Home</a>
        <a href="/register">Register</a>
        <a href="/login">Login</a>
        <a href="/posts">Posts</a>
        <a href="/posts/new">New Post</a>
        <a href="/forgot-password">Reset Password</a>
        <a href="/logout">Logout</a>
      </nav>

      <div class="container">
        <h1>NodeBlogify</h1>
        <p>Node.js ve Express ile geliştirilmiş basit blog sitesi.</p>
      </div>
    </body>
    </html>
  `);
});

// Geçici test route'larından /login ve /logout silindi.
// Bu işlemler artık MVC mimarisine uygun olarak userRoutes.js ve authController.js üzerinden yönetilecek.

app.get('/posts', (req, res) => {
  res.send('Posts page will be here.');
});

app.get('/forgot-password', (req, res) => {
  res.send('Reset password page will be here.');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT} 🚀`);
});