const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require('../config/keys');


const UserController = {
    async register(req, res) {
        try {
            const user = await User.create(req.body);
            res.status(201).send({ message: "User successfully registered", user });
        } catch (error) {
            console.error(error);
        }
    },
    async login(req, res) {
        try {
            const user = await User.findOne({
                email: req.body.email
            })
            token = jwt.sign({ _id: user._id }, jwt_secret);
            if (user.tokens.length > 4) user.tokens.shift();
            user.tokens.push(token);
            await user.save();
            res.send({message:"Welcome" + user.name, token})
        } catch (error) {
            console.error(error)
            return res.status(500).send({ error, message: 'Unable to log in' })
        }
    },
    async logout(req, res) {
        try {
            await User.findByIdAndUpdate(req.user._id, {
                $pull: {tokens:req.headers.authorization},
            })
            res.status(201).send({message:'successfully disconnected'})
        } catch (error) {
            console.error(error);
            res.status(500).send({message:'successfully disconnected'})
        }
    }
};

module.exports = UserController;