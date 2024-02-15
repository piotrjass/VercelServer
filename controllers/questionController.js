const mongoose = require('mongoose');
const { createModel } = require('../models/flashCardModel');
const { connectToDatabase } = require('../utils/databaseConnection');

connectToDatabase();

exports.getListOfCollectionsInDatabase = async (req, res, next) => {
  const { db } = mongoose.connection;
  const collections = await db.listCollections().toArray();
  const collectionNames = collections.map(collection => collection.name);
  const collectionNamesForQuiz = collectionNames.filter(
    item => item !== 'users' && item !== 'databases'
  );
  try {
    res.status(200).json({ data: collectionNamesForQuiz });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.addQuestion = async (req, res, next) => {
  const { title, answers, correctAnswer, type } = req.body;
  try {
    res.status(200).json({
      message: 'Hello form the add question!',
      title,
      answers,
      correctAnswer,
      type
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.findQuestionByQuestion = async (req, res, next) => {
  const { question, collectionName } = req.body;
  const Flashcard = createModel(collectionName);
  try {
    const foundQuestion = await Flashcard.findOne({ question, collectionName });
    res.status(200).json({
      question,
      collectionName,
      foundQuestion
    });
  } catch (error) {
    res.status(200).json({
      message: 'could not find a question'
    });
  }
};
