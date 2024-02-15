const express = require('express');

const router = express.Router();

const personalCredentialsController = require('../controllers/personalCredentialController');

router
  .route('/credentials')
  .get(personalCredentialsController.getFullCredentials);

module.exports = router;
