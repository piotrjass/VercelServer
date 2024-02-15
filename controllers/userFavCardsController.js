// jwt
const jwt = require('jsonwebtoken');
// database
const mongoose = require('mongoose');
// models
const User = require('../models/userModel');
const { createModel } = require('../models/flashCardModel');

const { connectToDatabase } = require('../utils/databaseConnection');

connectToDatabase();

exports.addToUserFavorites = async (req, res) => {
  const token = await req.headers.authorization.replace('Bearer ', '');
  const { id } = jwt.decode(token);
  const { question, answer, collection } = req.body;
  const card = { question, answer, collection };
  try {
    const user = await User.findById(id);
    const isAlreadyFavorite = user.favouriteCards.some(
      favouriteCards =>
        favouriteCards.question === question && favouriteCards.answer === answer
    );
    if (isAlreadyFavorite) {
      return res.status(200).json({
        message: 'Already in favorites!'
      });
    }
    const userFav = await User.findByIdAndUpdate(
      id,
      { $push: { favouriteCards: card } },
      { new: true }
    );

    res.status(200).json({
      message: 'success',
      userFav
    });

    res.status(200).json({
      message: 'hello'
    });
  } catch (error) {
    console.error(error);
  }
};

exports.deleteUserFavoriteCard = async (req, res) => {
  const token = await req.headers.authorization.replace('Bearer ', '');
  const { id } = jwt.decode(token);
  const { question, answer } = req.body;
  const card = { question, answer };
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $pull: { favouriteCards: card } },
      { new: true }
    );

    if (updatedUser) {
      res.status(200).json({
        message: 'success, deleted!',
        updatedUser
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error!'
    });
  }
};

exports.getUserFavoriteCards = async (req, res) => {
  const token = await req.headers.authorization.replace('Bearer ', '');
  const { id } = jwt.decode(token);
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const favoriteCards = user.favouriteCards;
    res.status(200).json({
      message: 'hello',
      favoriteCards
    });
  } catch (error) {
    console.error(error);
  }
};
