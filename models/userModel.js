const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/users.json');

const User = {
  getAll: () => {
    // Güvenlik kontrolü
    if (!fs.existsSync(dataPath)) {
      return [];
    }
    const data = fs.readFileSync(dataPath, 'utf8');
    return data ? JSON.parse(data) : [];
  },

  save: (userData) => {
    const users = User.getAll();
    users.push(userData);
    fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
  },

  findByUsername: (username) => {
    const users = User.getAll();
    return users.find(user => user.username === username);
  },

  //  GÖREV 4: Şifre Güncelleme Fonksiyonu
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