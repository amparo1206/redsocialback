const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new mongoose.Schema({
    name: String,
    Title: String,
    Description: String,
    image: String,
    coments: [{
        userId: { type: ObjectId, ref: 'User' },
        comment: String
    }],
    likes: [{type: ObjectId, ref:'User'}]
}, { timestamps: true });


const Post = mongoose.model('Post', PostSchema);

module.exports = Post;