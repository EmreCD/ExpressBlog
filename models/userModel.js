const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/users.json');

// Kullanıcı modeli veritabanı yerine data/users.json dosyasını kullanır.
// Controller'lar dosya işlemleriyle uğraşmadan bu fonksiyonları çağırır.
const User = {
  // Tüm kullanıcıları JSON dosyasından okur.
  // Dosya yoksa boş liste döndürerek uygulamanın kırılmasını engeller.
  getAll: () => {
    if (!fs.existsSync(dataPath)) {
      return [];
    }
    const data = fs.readFileSync(dataPath, 'utf8');
    return data ? JSON.parse(data) : [];
  },

  // Yeni kullanıcıyı mevcut kullanıcı listesine ekler ve dosyayı günceller.
  save: (userData) => {
    const users = User.getAll();
    users.push(userData);
    fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
  },

  // Kullanıcı adına göre tek bir kullanıcı arar.
  // Login ve şifre sıfırlama işlemlerinde kullanılır.
  findByUsername: (username) => {
    const users = User.getAll();
    return users.find(user => user.username === username);
  },

  // Kullanıcının şifresini değiştirir.
  // Kullanıcı bulunursa true, bulunamazsa false döndürür.
  updatePassword: (username, newPassword) => {
    const users = User.getAll();
    const userIndex = users.findIndex(user => user.username === username);
    
    if (userIndex !== -1) {
      users[userIndex].password = newPassword;
      fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
      return true;
    }
    return false;
  }
};

module.exports = User;
