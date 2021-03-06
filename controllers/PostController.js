const Post = require("../models/Post");
const User = require("../models/User");

const PostController = {
    async create(req, res) {
        try {
            const post = await Post.create({ ...req.body, userId: req.user._id })
            await User.findByIdAndUpdate(
                req.user._id,
                { $push: { postIds: post._id } },
                { new: true }
            );
            res.status(201).send(post)
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'we had a problem creating the post' })
        }
    },
    async getAll(req, res) {
        try {
            const posts = await Post.find()
                .populate('comments.userId')
                .populate('userId')
            res.send(posts.reverse())
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
    async insertComment(req, res) {
        try {
            const post = await Post.findByIdAndUpdate(
                req.params._id,
                { $push: { comments: { ...req.body, userId: req.user._id } } },
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
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'there was a problem with your like' })
        }
    },
    async disLike(req, res) {
        try {
            const post = await Post.findByIdAndUpdate(
                req.params._id,
                { $pull: { likes: req.user._id } },
                { new: true }
            );
            await User.findByIdAndUpdate(
                req.params._id,
                { $pull: { likes: req.params._id } },
                { new: true }
            );
            res.send(post)
        } catch (erros) {
            console.error(error);
            res.status(500).send({ message: 'there was a problem with your like' })
        }
    },
    async getByTitle(req, res) {
        const title = new RegExp(`${req.params.title}`, 'i')
        try {
            const posts = await Post.aggregate([
                {
                    $match: {
                        title
                    }
                }
            ]);
            res.send(posts)
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'There has been a problem bringing the post by title' })
        }
    }
}

module.exports = PostController;