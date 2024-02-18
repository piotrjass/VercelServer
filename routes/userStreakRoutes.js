const express = require('express');

const router = express.Router();

const userStreak = require('../controllers/UserStreakController');

router.route('/userStreak').get(userStreak.getUserStreak);
router.route('/userStreak').post(userStreak.clearUserStreak);
router.route('/userStreak').patch(userStreak.increaseUserStreak);

module.exports = router;
