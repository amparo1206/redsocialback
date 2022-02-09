const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.delete('/logout', UserController.logout)
router.get('/recoverPassowrd/:email', UserController.recoverPassword)


module.exports = router;