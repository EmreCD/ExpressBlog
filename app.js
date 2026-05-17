const express = require('express');
const session = require('express-session');
const path = require('path');

const userRoutes = require('./routes/userRoutes');
const postRoutes = require("./routes/postRoutes");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'expressblog-secret-key',
  resave: false,
  saveUninitialized: false
}));

app.use('/', userRoutes);
app.use('/posts', postRoutes);

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

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
