const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    name: String,
    Title: String,
    Description: String,
}, { timestamps: true });

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;