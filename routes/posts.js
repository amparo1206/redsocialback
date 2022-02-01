const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');

router.post('/', PostController.create);
router.get('/', PostController.getAll);
router.get('/id/:_id', PostController.getById);

module.exports = router;