const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    Password: String,
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;