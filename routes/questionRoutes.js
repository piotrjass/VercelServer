const express = require('express');

const router = express.Router();

const questionController = require('../controllers/questionController');

router.route('/question').post(questionController.addQuestion);
router
  .route('/questions')
  .get(questionController.getListOfCollectionsInDatabase);
router.route('/questions').post(questionController.findQuestionByQuestion);

module.exports = router;
