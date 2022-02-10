const User = require('../models/User');
const Post = require('../models/Post')
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/keys');

const authentication = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const payload = jwt.verify(token, jwt_secret);
        const user = await User.findOne({ _id: payload._id, tokens: token });
        if (!user) {
            return res.status(401).send({message:'You are not authorised'})
        }
        req.user = user;
        next()
    } catch (error) {
        console.error(error)
        return res.status(500).send({error, message:"There has been a problem with the token"})
    }
} 

const isAuthor = async(req, res, next) => {
    try {
        const post = await Post.findById(req.params._id);
        if (post.userId.toString() !== req.user._id.toString()) { 
            return res.status(403).send({ message: 'This post is not yours' });
        }
        next();
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error, message: 'There was a problem verifying the authorship of the post.' })
    }
}

module.exports = { authentication, isAuthor }
