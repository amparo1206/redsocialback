const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');
const { authentication, isAuthor } = require('../middelwares/authentication');

router.post('/',authentication,isAuthor, PostController.create);
router.get('/', PostController.getAll);
router.get('/id/:_id', PostController.getById);
router.get('/name/:name', PostController.getPostByName);
router.put('/:_id',authentication,isAuthor, PostController.update);
router.delete('/:_id', authentication, isAuthor, PostController.delete);
router.put('/coments/:_id', authentication, PostController.insertComment)
router.put('/like', PostController.like)
router.put('/disLike', PostController.disLike)

module.exports = router;