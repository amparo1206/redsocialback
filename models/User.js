const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "put your name"],
        },

        email: {
            type: String,
            match: [/.+\@.+\..+/, "this e-mail is invalid"],
            required: [true, "put your email"],
        },
        password: {
            type: String,
            required: [true, "put your password"]
        },
        role: String,
        tokens: [],
        likes: [{ type: ObjectId, ref: 'Post' }],
        postIds: [{ type: ObjectId, ref:'Post'}]
        
    }, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;