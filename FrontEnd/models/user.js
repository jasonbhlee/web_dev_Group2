const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userFirstName: { type: String, required : true},
    userLastName: { type: String, required : true},
    email: { type: String, required : true},
    userId: { type: String, required : true},
    password: {type: String, required: true},
    project: {type: [], required: false}
});

module.exports = mongoose.model('user', userSchema);
