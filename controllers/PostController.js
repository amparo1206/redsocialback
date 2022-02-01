const Post = require("../models/Post");

const PostController = {
    async create(req, res) {
        try {
            const post = await Post.create({ ...req.body })
            res.status(201).send(post)
        } catch (error) {
            console.error(error)
            res.status(500).send({message:'we had a problem creating the post'})
        }
    },
    async getAll(req, res) {
        try {
            const posts = await Post.find()
            res.send(posts)
        } catch (error) {
            console.error(error);
        }
    },
}

module.exports = PostController;