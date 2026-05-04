# 🚀 NodeBlogify

NodeBlogify, Node.js ve Express kullanılarak geliştirilmiş basit bir blog uygulamasıdır.  
Proje MVC mimarisi ile oluşturulmuş olup veriler JSON dosyalarında saklanmaktadır.

---

## 📌 Özellikler

- 👤 Kullanıcı kayıt (Register)
- 🔐 Kullanıcı giriş (Login)
- 🔄 Şifre sıfırlama (Password Reset)
- ✍️ Blog yazısı oluşturma
- 📄 Blog yazılarını listeleme

---

## 🏗️ Teknolojiler

- Node.js
- Express.js
- Express-session
- HTML / CSS
- JSON

---

## 📁 Proje Yapısı


NodeBlogify/
│
├── controllers/
├── models/
├── routes/
├── views/
├── data/
│ ├── users.json
│ └── posts.json
├── public/
├── app.js
└── package.json


---

## ⚙️ Kurulum

```bash
git clone https://github.com/KULLANICI_ADIN/NodeBlogify.git
cd NodeBlogify
npm install
npm start

Tarayıcıda aç:

http://localhost:3000
👥 Görev Dağılımı
Project Setup → temel yapı
Register → kullanıcı kayıt
Login → giriş sistemi
Password Reset → şifre değiştirme
Blog System → yazı ekleme ve listeleme
📌 Kullanım
Register sayfasından kullanıcı oluştur
Login ile giriş yap
Yeni post oluştur
Postları görüntüle
Şifreni sıfırla
⚠️ Not
Bu proje eğitim amaçlıdır
Veritabanı yerine JSON kullanılmıştır
Şifreler düz metin olarak saklanır (güvenli değildir)