const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require('../config/keys');
const bcrypt = require('bcryptjs');
const transporter = require ('../config/nodemailer');
const { find } = require("../models/User");



const UserController = {
    async register(req, res) {
        try {
            let user = await User.findOne({
                email: req.body.email,
            });
            if (user) return res.status(400).send("this email is already registered")
            const hash = bcrypt.hashSync(req.body.password, 10)
            user = await User.create({ ...req.body, password: hash });
            const emailToken = jwt.sign({ email: req.body.email }, jwt_secret);
            const url = "http://localhost:3001/users/confirm/" + emailToken;
            await transporter.sendMail({
                to: req.body.email,
                subject: "Confirme su registro",
                html: `<h3>Bienvenido, estás a un paso de registrarte </h3>
                <a href="${url}"> Click para confirmar tu registro</a>
                `,
              });
        
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
    async confirm(req, res) {
        try {
          const token = req.params.emailToken;
          console.log(token);
          const payload = jwt.verify(token, jwt_secret);
          const user = await User.findOne({ email: payload.email });
          user.verified = true;
          user.save();
          res.status(201).send({message: "Te has registrado correctamente!"});
        } catch (error) {
          console.log(error);
        }
      },
    async login(req, res) {
        try {
            const user = await User.findOne({
                email: req.body.email
            })
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isMatch) {
                return res.status(400).send({ message: "Incorrect username or password" })
            }
            token = jwt.sign({ _id: user._id }, jwt_secret);
            if (user.tokens.length > 4) user.tokens.shift();
            user.tokens.push(token);
            await user.save();
            res.send({ message: "Welcome " + user.name, token, user})
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
    },
    async recoverPassword(req, res) {
        try {
            const recoverToken = jwt.sign({ email: req.params.email }, jwt_secret, {
                expiresIn: "48h",
            });
            const url = "http://localhost:3000/users/resetPassword/" + recoverToken;
            await transporter.sendMail({
                to: req.params.email,
                subject: "Password recovery",
                html: `<h3> Password recovery </h3>
      <a href="${url}">Password recovery</a>
      Link will expire in 48 hours
      `,
            });
            res.send({
                message: "A recovery email was sent to your email address.",
            });
        } catch (error) {
            console.error(error);
        }
    },
    async resetPassword(req, res) {
        try {
          const recoverToken = req.params.recoverToken;
          const payload = jwt.verify(recoverToken, jwt_secret);
          await User.findOneAndUpdate(
            { email: payload.email },
            { password: req.body.password }
          );
          res.send({ message: "password changed successfully" });
        } catch (error) {
          console.error(error);
        }
      },
    
    async getInfo(req, res) {
        try {
            const user = await User.findById(req.user._id)
                .populate("postIds")
                .populate("likes")
            res.send(user)
        } catch (error) {
            console.error(error)
            res.status(500).send({message:'user information could not be retrieved'})
        }
    }
};

module.exports = UserController;