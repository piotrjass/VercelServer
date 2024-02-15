// jwt
const jwt = require('jsonwebtoken');
// database
const mongoose = require('mongoose');
// models
const User = require('../models/userModel');
//
const moment = require('moment');

const { connectToDatabase } = require('../utils/databaseConnection');

connectToDatabase();

const findUserByToken = async token => {
  try {
    const { id } = jwt.decode(token);
    const user = await User.findById(id);
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const findUserByID = async id => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUserId = async token => {
  try {
    const { id } = await jwt.decode(token);
    return id;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getDateOfLastLogin = async token => {
  const user = await findUserByToken(token);
  const { dateOfLastLogin } = user;
  return dateOfLastLogin;
};

function parseDate(dateString) {
  const [day, month, year] = dateString.split('-');
  return new Date(year, month - 1, day);
}

function getDateDiffrenceBetweenDates(date1, date2) {
  const parsedDate1 = parseDate(date1);
  const parsedDate2 = parseDate(date2);
  const timeDifference = parsedDate1 - parsedDate2;
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
  return daysDifference;
}

exports.getUserStreak = async (req, res, next) => {
  const token = await req.headers.authorization.replace('Bearer ', '');
  const user = await findUserByToken(token);
  const { daysStreak, dateOfLastLogin } = user;
  res.status(200).json({
    daysStreak,
    dateOfLastLogin
  });
};

exports.increaseUserStreak = async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace('Bearer ', '');
    const id = await getUserId(token);
    const todayDate = moment().format('DD-MM-YYYY');
    const dateOfLastLogin = await getDateOfLastLogin(token);
    const dateDiffence = getDateDiffrenceBetweenDates(
      todayDate,
      dateOfLastLogin
    );
    if (Number(dateDiffence) !== 1) return;
    await User.updateOne({ _id: id }, { $inc: { daysStreak: 1 } });
    const updatedUser = await findUserByID(id);
    res.status(200).json({
      daysStreakValue: updatedUser.daysStreak
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Could not increase!'
    });
  }
};

exports.clearUserStreak = async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace('Bearer ', '');
    const id = await getUserId(token);
    await User.updateOne({ _id: id }, { daysStreak: 0 });
    const updatedUser = await findUserByID(id);
    res.status(200).json({
      daysStreakValue: updatedUser.daysStreak
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Could not clear days streak!!'
    });
  }
};
