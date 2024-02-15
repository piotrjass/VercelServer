const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

router.route('/user').post(userController.createUser);
router.route('/user').patch(userController.changeName);

module.exports = router;
