// jwt
const jwt = require('jsonwebtoken');
// database
const mongoose = require('mongoose');
// models
const User = require('../models/userModel');
const { createModel } = require('../models/flashCardModel');

const { connectToDatabase } = require('../utils/databaseConnection');

connectToDatabase();

exports.createUser = (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  res.status(200).json({
    message: 'This route is not yet defined! This is a create user!',
    username,
    email,
    password,
    confirmPassword
  });
};

exports.changeName = async (req, res) => {
  const token = await req.headers.authorization.replace('Bearer ', '');
  const { id } = jwt.decode(token);
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { name: 'Kuba' },
      {
        new: true
      }
    );
    const updateUser = JSON.stringify(user);
    res.status(200).json({
      message: 'changes successfully',
      user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Could not change the name!'
    });
  }
};
