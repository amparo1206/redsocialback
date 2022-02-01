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
    async getById(req, res) {
        try {
            const post = await Post.findById(req.params._id)
            res.send(post)
        } catch (error) {
            console.error(error);
        }
    },
    async getPostByName(req, res) {
        try {
            const post = await Post.aggregate([{
                $match: {
                    name:req.params.name
                }
            }])
            res.send(post)
        } catch (error) {
            console.log(error)
        }
    },
    async update(req, res) {
        try {
            const post = await Post.findByIdAndUpdate(req.params._id, req.body, { new: true })
            res.send({ message: "product successfully updated", post });
        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = PostController;