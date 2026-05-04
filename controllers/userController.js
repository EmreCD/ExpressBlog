const path = require('path');
const User = require('../models/userModel');

exports.getRegisterPage = (req, res) => {
  res.sendFile(path.join(__dirname, '../views/register.html'));
};

exports.registerUser = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.send('Please fill all fields.');
  }

  const existingUser = User.findByUsername(username);

  if (existingUser) {
    return res.send('This username is already taken.');
  }

  User.save({
    username,
    password
  });

  res.send(`User ${username} registered successfully!`);
};