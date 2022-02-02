const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');
const { authentication } = require("../middlewares/authentication");

router.post('/',authentication, PostController.create);
router.get('/', PostController.getAll);
router.get('/id/:_id', PostController.getById);
router.get('/name/:name', PostController.getPostByName);
router.put('/:_id',authentication, PostController.update);
router.delete('/:_id',authentication, PostController.delete);

module.exports = router;