const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authentication } = require('../middelwares/authentication');

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get("/confirm/:emailToken", UserController.confirm);
router.delete('/logout', UserController.logout)
router.get('/recoverPassword/:email',authentication, UserController.recoverPassword)
router.put('/resetPassword/:recoverToken',  UserController.resetPassword)
router.get('/info',authentication, UserController.getInfo)


module.exports = router;
