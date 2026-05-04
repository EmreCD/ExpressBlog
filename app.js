const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3000;

// Form verilerini okumak için
app.use(express.urlencoded({ extended: true }));

// CSS gibi static dosyalar için
app.use(express.static(path.join(__dirname, 'public')));

// Session ayarı
app.use(session({
  secret: 'nodeblogify-secret-key',
  resave: false,
  saveUninitialized: true
}));

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

// Geçici test route'ları
app.get('/register', (req, res) => {
  res.send('Register page will be here.');
});

app.get('/login', (req, res) => {
  res.send('Login page will be here.');
});

app.get('/posts', (req, res) => {
  res.send('Posts page will be here.');
});

app.get('/posts/new', (req, res) => {
  res.send('New post page will be here.');
});

app.get('/forgot-password', (req, res) => {
  res.send('Reset password page will be here.');
});

app.get('/logout', (req, res) => {
  res.send('Logout will be here.');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});