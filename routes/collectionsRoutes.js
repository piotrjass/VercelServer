const express = require('express');

const router = express.Router();

const collectionsController = require('../controllers/collectionsController');

router
  .route('/resources')
  .get(collectionsController.getUsersResourcesStarted)
  .post(collectionsController.addToResourcesStartedOrEnded);

router
  .route('/collectionsCount')
  .get(collectionsController.countDocumentsInCollectionsThatUserFinished);

module.exports = router;
