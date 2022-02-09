const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require('../config/keys');
const bcrypt = require('bcryptjs');



const UserController = {
    async register(req, res) {
        try {
            let user = await User.findOne({
                email: req.body.email,
            });
            if (user) return res.status(400).send("this email is already registered")
            const hash = bcrypt.hashSync(req.body.password, 10)
            user = await User.create({ ...req.body, password: hash });
            res.status(201).send({ message: "User successfully registered", user });
        } catch (error) {
            console.error(error)
            if (error.name == 'ValidationError') {
                const errName = await Objects.keys(error.errors)[0]
                res.status(400).send(error.errors[errName].message)
            }
            res.status(500).send(error)
        }
    },
    async login(req, res) {
        try {
            const user = await User.findOne({
                email: req.body.email
            })
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isMatch) {
                return res.status(400).send({ message: "Usuario o contraseña incorrectos" })
            }
            token = jwt.sign({ _id: user._id }, jwt_secret);
            if (user.tokens.length > 4) user.tokens.shift();
            user.tokens.push(token);
            await user.save();
            res.send({ message: "Welcome" + user.name, token })
        } catch (error) {
            console.error(error)
            return res.status(500).send({ error, message: 'Unable to log in' })
        }
    },
    async logout(req, res) {
        try {
            await User.findByIdAndUpdate(req.user._id, {
                $pull: { tokens: req.headers.authorization },
            })
            res.status(201).send({ message: 'successfully disconnected' })
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'successfully disconnected' })
        }
    }
};

module.exports = UserController;