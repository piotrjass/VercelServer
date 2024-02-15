// jwt
const jwt = require('jsonwebtoken');
// database
const mongoose = require('mongoose');
// models
const User = require('../models/userModel');

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    dbName: 'JSQuiz',
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() =>
    console.log('DB connection successful from Common Functions/ Utils!')
  );

exports.findUserByToken = async token => {
  try {
    const { id } = jwt.decode(token);
    const user = await User.findById(id);
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.findUserByID = async id => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.getUserId = async token => {
  try {
    const { id } = await jwt.decode(token);
    return id;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
