// jwt
const jwt = require('jsonwebtoken');
// database
const mongoose = require('mongoose');
// models
const User = require('../models/userModel');
const { createModel } = require('../models/flashCardModel');
// db
const { connectToDatabase } = require('../utils/databaseConnection');

connectToDatabase();

exports.hello = async (req, res) => {
  res.status(200).json({
    message: 'hello'
  });
};

exports.getUsersFavCollections = async (req, res) => {
  try {
    const token = await req.headers.authorization.replace('Bearer ', '');
    const { id } = jwt.decode(token);
    const UsersCollections = createModel('users');
    const user = await UsersCollections.findById(id).lean();
    const { favourites } = user;
    res.status(200).json({
      favourites,
      message: 'getting collections',
      user
    });
  } catch (error) {
    console.error(error);
  }
};

exports.addToFavoriteCollection = async (req, res) => {
  const token = await req.headers.authorization.replace('Bearer ', '');
  const { id } = jwt.decode(token);
  const { resourceCollection, resourceName } = req.body;
  try {
    const user = await User.findById(id);
    const isAlreadyFavorite = user.favourites.some(
      favorite =>
        favorite.resourceCollection === resourceCollection &&
        favorite.resourceName === resourceName
    );
    if (isAlreadyFavorite) {
      return res.status(200).json({
        message: 'Already in favorites!'
      });
    }

    const userFav = await User.findByIdAndUpdate(
      id,
      { $push: { favourites: { resourceCollection, resourceName } } },
      { new: true }
    );

    const updatedUser = JSON.stringify(userFav);
    res.status(200).json({
      message: 'success',
      updatedUser
    });
  } catch (error) {
    console.error(error);
  }
};

exports.deleteFavCollection = async (req, res) => {
  const token = await req.headers.authorization.replace('Bearer ', '');
  const { id } = jwt.decode(token);
  const { collectionName } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $pull: { favourites: { resourceCollection: collectionName } } },
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
