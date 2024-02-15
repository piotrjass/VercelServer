const express = require('express');

const router = express.Router();

const articleController = require('../controllers/articleController');

router.route('/article/:id').get(articleController.getArticleById);
router.route('/article').post(articleController.createArticle);
//
router.route('/articles').get(articleController.getListOfAllArticles);

module.exports = router;
