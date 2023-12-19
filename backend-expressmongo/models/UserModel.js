// Author: Kainat Khan
// Date: July 24, 2023
const mongoose = require('mongoose');

// User schema
const userSchema = new mongoose.Schema({
  user_id: {
    type: String
  },
  password: {
    type: String
  }
}, { collection: 'users' });

// User model
const Users = mongoose.model('users', userSchema, "users");

module.exports = Users;