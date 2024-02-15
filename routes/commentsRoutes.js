const express = require('express');

const router = express.Router();

const commentsController = require('../controllers/commentsController');

router.route('/comment').get(commentsController.getCommentByID);
router.route('/comment').post(commentsController.createComment);

module.exports = router;
