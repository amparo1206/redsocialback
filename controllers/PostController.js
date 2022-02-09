const Post = require("../models/Post");
const User = require("../models/User");

const PostController = {
    async create(req, res) {
        try {
            const post = await Post.create({ ...req.body })
            res.status(201).send(post)
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'we had a problem creating the post' })
        }
    },
    async getAll(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const posts = await Post.find()
                .populate('coments.userId')
                .limit(limit * 1)
                .skip((page - 1) * limit);
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
                    name: req.params.name
                }
            }])
            res.send(post)
        } catch (error) {
            console.log(error)
        }
    },
    async insertComment(req, res) {
        try {
            const post = await Post.findByIdAndUpdate(
                req.param._id,
                { $push: { coments: { ...req.body, userId: req.user._id } } },
                { new: true }
            );
            res.send(post);
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'There was a problem with the comment' })

        }
    },
    async update(req, res) {
        try {
            const post = await Post.findByIdAndUpdate(req.params._id, req.body, { new: true })
            res.send({ message: "post successfully updated", post });
        } catch (error) {
            console.error(error)
        }
    },
    async delete(req, res) {
        try {
            const post = await Post.findByIdAndDelete(req.params._id)
            res.send({ post, message: 'Post delete' })
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'the product could not be removed' })
        }
    },
    async like(req, res) {
        try {
            const post = await Post.findByIdAndUpdate(
                req.params._id,
                { $push: { likes: req.user._id } },
                { new: true }
            );
            await User.findByIdAndUpdate(
                req.params._id,
                { $push: { likes: req.params._id } },
                { new: true }
            );
            res.send(post)
        } catch (erros) {
            console.error(error);
            res.status(500).send({message:'there was a problem with your like'})
        }
    }
}

module.exports = PostController;