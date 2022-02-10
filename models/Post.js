const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new mongoose.Schema({
    userId: { type: ObjectId, ref: 'User' },
    title: String,
    description: String,
    image: String,
    comments: [{
        userId: { type: ObjectId, ref: 'User' },
        comment: String
    }],
    likes: [{type: ObjectId, ref:'User'}]
}, { timestamps: true });


const Post = mongoose.model('Post', PostSchema);

module.exports = Post;