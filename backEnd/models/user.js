const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userFirstName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Explicitly specify the collection name as 'test1'
const User = mongoose.model('User', userSchema, 'test1');

module.exports = User;
