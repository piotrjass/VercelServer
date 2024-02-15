const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/userModel');

const { findUserByToken } = require('../utils/CommonFunctions');

const { connectToDatabase } = require('../utils/databaseConnection');

connectToDatabase();

async function checkIfCollectionsAleardyExistis(
  startedCollection,
  endedCollection,
  token
) {
  const user = await findUserByToken(token);
  const { resourcesStarted, resourcesEnded } = user;
  const alreadyExistsInStarted = resourcesStarted.some(
    el => el === startedCollection
  );
  const alreadyExistsinEnded = resourcesEnded.some(
    el => el === endedCollection
  );
  return {
    alreadyExistsInStarted,
    alreadyExistsinEnded
  };
}

async function getLengthOfCollection(collectionName) {
  try {
    const { db } = mongoose.connection;
    const count = await db.collection(collectionName).countDocuments();
    return count;
  } catch (error) {
    console.error(
      `Błąd podczas pobierania liczby dokumentów z kolekcji ${collectionName}:`,
      error
    );
    throw error;
  }
}

exports.getUsersResourcesStarted = async (req, res) => {
  const token = await req.headers.authorization.replace('Bearer ', '');
  const user = await findUserByToken(token);
  try {
    // const allCollectionInDatabase = getListOfCollections();
    const { resourcesStarted, resourcesEnded } = user;
    const resourcesStartedLength = resourcesStarted.length;
    res.status(200).json({
      message: 'success',
      resourcesStartedLength,
      resourcesStarted,
      resourcesEnded
    });
  } catch (error) {
    console.error(error);
  }
};

exports.countDocumentsInCollectionsThatUserFinished = async (req, res) => {
  try {
    const token = await req.headers.authorization.replace('Bearer ', '');
    const user = await findUserByToken(token);
    const { resourcesEnded } = user;
    const counts = await Promise.all(
      resourcesEnded.map(async el => {
        return await getLengthOfCollection(el);
      })
    );
    const countOfDocumentsFromFinishedCollections = counts.reduce(
      (val, acc) => acc + val,
      0
    );
    res.status(200).json({
      countOfDocumentsFromFinishedCollections
    });
  } catch (error) {
    console.error('Could not count documents!');
  }
};

exports.addToResourcesStartedOrEnded = async (req, res) => {
  const token = await req.headers.authorization.replace('Bearer ', '');
  const { id } = jwt.decode(token);
  const { startedCollection, finishedCollection } = req.body;
  try {
    const collectionAlreadyExists = await checkIfCollectionsAleardyExistis(
      startedCollection,
      finishedCollection,
      token
    );
    if (
      collectionAlreadyExists.alreadyExistsInStarted ||
      collectionAlreadyExists.alreadyExistsinEnded
    ) {
      return res.status(400).json({
        message: 'The collections already exist'
      });
    }
    ///
    const result = await User.findByIdAndUpdate(
      id,
      {
        $push: {
          resourcesStarted: { $each: [startedCollection] },
          resourcesEnded: { $each: [finishedCollection] }
        }
      },
      { new: true }
    );
    const updateUser = await findUserByToken(token);
    res.status(200).json({
      message: 'hello',
      updateUser
    });
  } catch (error) {
    console.error(error);
  }
};
