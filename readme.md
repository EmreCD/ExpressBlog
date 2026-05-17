# ExpressBlog

ExpressBlog, Node.js ve Express kullanılarak geliştirilmiş basit bir blog uygulamasıdır.  
Proje MVC mimarisi ile oluşturulmuş olup veriler JSON dosyalarında saklanmaktadır.

---

## Özellikler

- Kullanıcı kayıt
- Kullanıcı giriş
- Şifre sıfırlama
- Blog yazısı oluşturma
- Blog yazılarını listeleme

---

## Teknolojiler

- Node.js
- Express.js
- Express-session
- HTML / CSS
- JSON

---

## Proje Yapısı


ExpressBlog/
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

## Kurulum

```bash
git clone https://github.com/KULLANICI_ADIN/ExpressBlog.git
cd ExpressBlog
npm install
npm start
```

Tarayıcıda aç:

http://localhost:3000

## Kullanım

- Register sayfasından kullanıcı oluştur
- Login ile giriş yap
- Yeni post oluştur
- Postları görüntüle
- Şifreni sıfırla

## Not

Bu proje eğitim amaçlıdır
Veritabanı yerine JSON kullanılmıştır
Şifreler düz metin olarak saklanır (güvenli değildir)
