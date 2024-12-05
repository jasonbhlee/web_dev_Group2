const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create the schema for user data
const userSchema = new Schema({
  userFirstName: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Email should be unique
  password: { type: String, required: true }, // Make sure to hash the password before saving
});

const User = mongoose.model('User', userSchema);

module.exports = User;
