const postModel = require("../models/postModel");

// Kullanıcı adını HTML içine basmadan önce özel karakterleri dönüştürür.
// Bu sayede kullanıcı adı içinde < veya & gibi karakterler varsa sayfa yapısı bozulmaz.
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Menü HTML'ini kullanıcının giriş durumuna göre üretir.
// Giriş yapan kullanıcı yazı ekleyebilir ve çıkış yapabilir.
// Giriş yapmayan kullanıcı kayıt/giriş/şifre sıfırlama bağlantılarını görür.
function getNav(user) {
  if (user) {
    return `
      <nav>
        <a href="/">Home</a>
        <a href="/posts">Posts</a>
        <a href="/posts/new">New Post</a>
        <a href="/logout">Logout</a>
      </nav>
    `;
  }

  return `
    <nav>
      <a href="/">Home</a>
      <a href="/register">Register</a>
      <a href="/login">Login</a>
      <a href="/posts">Posts</a>
      <a href="/forgot-password">Reset Password</a>
    </nav>
  `;
}

// Yeni post formunu gösterir.
// Bu fonksiyon requireLogin middleware'inden sonra çalıştığı için session'da kullanıcı beklenir.
function showNewPostPage(req, res) {
  const username = escapeHtml(req.session.user.username);

  res.send(`
    <!DOCTYPE html>
    <html lang="tr">
    <head>
      <meta charset="UTF-8">
      <title>Yeni Post - ExpressBlog</title>
      <link rel="stylesheet" href="/style.css">
    </head>
    <body>
      ${getNav(req.session.user)}

      <div class="container">
        <h1>Yeni Blog Yazisi</h1>
        <p>Yazar: ${username}</p>

        <form action="/posts/new" method="POST">
          <div>
            <label>Baslik</label>
            <input type="text" name="title" required>
          </div>

          <div>
            <label>Icerik</label>
            <textarea name="content" required></textarea>
          </div>

          <button type="submit">Post Olustur</button>
        </form>
      </div>
    </body>
    </html>
  `);
}

// Yeni blog yazısını kaydeder.
// Başlık ve içerik formdan gelir, yazar adı ise login olmuş kullanıcının session bilgisinden alınır.
function createPost(req, res) {
  const { title, content } = req.body;
  const username = req.session.user.username;

  if (!title || !content) {
    return res.send("Baslik ve icerik bos birakilamaz.");
  }

  postModel.addPost({
    title,
    content,
    author: username
  });

  res.redirect("/posts"); 
}

// Blog yazılarının listelendiği sayfayı HTML olarak üretir.
// Sayfa açıldıktan sonra tarayıcı /posts/api/all adresinden yazıları JSON olarak çeker.
function getPostsPage(req, res) {
  res.send(`
    <!DOCTYPE html>
    <html lang="tr">
    <head>
      <meta charset="UTF-8">
      <title>ExpressBlog - Blog Yazıları</title>
      <link rel="stylesheet" href="/style.css">
    </head>
    <body>
      ${getNav(req.session.user)}

      <div class="container">
        <h1>Tüm Blog Yazıları</h1>
        <div id="posts-container">Yazılar yükleniyor...</div>
      </div>

      <script>
        fetch('/posts/api/all')
          .then(res => res.json())
          .then(posts => {
            const container = document.getElementById('posts-container');
            container.innerHTML = '';

            if (posts.length === 0) {
              container.innerHTML = '<p>Henüz hiç blog yazısı paylaşılmamış.</p>';
              return;
            }

            posts.reverse().forEach(post => {
              container.innerHTML += \`
                <div class="post-card">
                  <h2 class="post-title">\${post.title}</h2>
                  <p class="post-content">\${post.content}</p>
                  <div class="post-meta">Yazar: \${post.author || 'Anonim'} | Tarih: \${post.createdAt || ''}</div>
                </div>
              \`;
            });
          })
          .catch(() => {
            document.getElementById('posts-container').innerHTML = '<p>Yazılar yüklenirken bir hata oluştu.</p>';
          });
      </script>
    </body>
    </html>
  `);
}

// posts.json içindeki yazıları JSON olarak döner.
// Frontend tarafındaki fetch isteği bu endpoint'i kullanır.
function listPosts(req, res) {
  const posts = postModel.getPosts();
  res.json(posts);
}

module.exports = {
  showNewPostPage,
  createPost,
  getPostsPage,
  listPosts
};
