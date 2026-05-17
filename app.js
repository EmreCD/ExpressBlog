const express = require('express');
const session = require('express-session');
const path = require('path');

const userRoutes = require('./routes/userRoutes');
const postRoutes = require("./routes/postRoutes");

const app = express();
const PORT = 3000;

function normalizeBasePath(value) {
  if (!value || value === '/') {
    return '';
  }

  const withLeadingSlash = value.startsWith('/') ? value : `/${value}`;
  return withLeadingSlash.replace(/\/$/, '');
}

const BASE_PATH = normalizeBasePath(process.env.BASE_PATH || '/sdlc_project');

function appUrl(pathname) {
  return `${BASE_PATH}${pathname}` || pathname;
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: 'expressblog-secret-key',
  resave: false,
  saveUninitialized: false
}));

app.locals.basePath = BASE_PATH;

const router = express.Router();

router.use('/', userRoutes);
router.use('/posts', postRoutes);

router.get('/', (req, res) => {
  const isLoggedIn = Boolean(req.session.user);
  const navLinks = isLoggedIn
    ? `
        <a href="${appUrl('/')}">Home</a>
        <a href="${appUrl('/posts')}">Posts</a>
        <a href="${appUrl('/posts/new')}">New Post</a>
        <a href="${appUrl('/logout')}">Logout</a>
      `
    : `
        <a href="${appUrl('/')}">Home</a>
        <a href="${appUrl('/register')}">Register</a>
        <a href="${appUrl('/login')}">Login</a>
        <a href="${appUrl('/posts')}">Posts</a>
        <a href="${appUrl('/forgot-password')}">Reset Password</a>
      `;

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>ExpressBlog</title>
      <link rel="stylesheet" href="${appUrl('/style.css')}">
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

app.use(BASE_PATH, express.static(path.join(__dirname, 'public')));
app.use(BASE_PATH, router);

if (BASE_PATH) {
  app.get('/', (req, res) => {
    res.redirect(BASE_PATH);
  });
}

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}${BASE_PATH}`);
});
