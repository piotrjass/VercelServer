const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');

router.route('/login').post(authController.login);
router.route('/token').post(authController.verifyToken);

module.exports = router;
