const express = require('express');

const router = express.Router();

const userFavCollectionsController = require('../controllers/userFavCollectionsController');

router
  .route('/userFavCollection')
  .get(userFavCollectionsController.getUsersFavCollections);
router.route('/fHallo').get(userFavCollectionsController.hello);
router
  .route('/userFavCollection')
  .patch(userFavCollectionsController.addToFavoriteCollection);
router
  .route('/userFavCollection')
  .delete(userFavCollectionsController.deleteFavCollection);

module.exports = router;
