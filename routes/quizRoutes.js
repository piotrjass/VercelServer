const express = require('express');

const router = express.Router();

const quizController = require('../controllers/quizController');

router.route('/quiz/:colName').get(quizController.getFlashcards);
router.route('/quiz').post(quizController.addFlashcard);
router.route('/quiz').patch(quizController.updateFlashcard);
router.route('/quiz').delete(quizController.deleteFlashcard);

module.exports = router;
