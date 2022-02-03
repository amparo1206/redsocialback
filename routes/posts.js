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

module.exports = router;