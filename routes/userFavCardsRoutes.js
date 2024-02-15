const express = require('express');

const router = express.Router();

const userFavCardsController = require('../controllers/userFavCardsController');

router.route('/userFavCards').get(userFavCardsController.getUserFavoriteCards);
router.route('/userFavCards').patch(userFavCardsController.addToUserFavorites);
router
  .route('/userFavCards')
  .delete(userFavCardsController.deleteUserFavoriteCard);

module.exports = router;
