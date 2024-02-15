const { createModel } = require('../models/flashCardModel');

const { connectToDatabase } = require('../utils/databaseConnection');

connectToDatabase();

async function findFlashcardByQuestion(question, collectionName) {
  try {
    const Flashcard = createModel(collectionName);
    const { _id } = await Flashcard.findOne({ question: question });
    return _id;
  } catch (error) {
    console.error(error);
  }
}

exports.addFlashcard = async (req, res, next) => {
  try {
    const { question, answer, type, collectionName } = req.body;
    const dynamicName = req.body.collectionName;
    const Flashcard = createModel(dynamicName);
    const card = await Flashcard.create({
      question,
      answer,
      type,
      collectionName
    });
    res.status(200).json({
      message: 'successfully added',
      data: card
    });
  } catch (error) {
    res.status(500).json({ message: 'Cound not add flashcard! why?' });
  }
};

exports.getFlashcards = async function(req, res, next) {
  const collectionName = req.params.colName;
  try {
    //
    const Flashcard = createModel(collectionName);
    const flashcardData = await Flashcard.find({
      collectionName: collectionName
    });

    const simplifiedData = flashcardData.map(card => ({
      question: card.question,
      answer: card.answer,
      collectionName: card.collectionName
    }));
    res.status(200).json({
      collectionName,
      simplifiedData
    });
  } catch (error) {
    res.status(500).json({ message: 'Cound not get flashcards!' });
  }
};
exports.updateFlashcard = async function(req, res, next) {
  const { collectionName, question, newQuestion, newAnswer } = req.body;
  const id = await findFlashcardByQuestion(question, collectionName);
  try {
    const Flashcard = createModel(collectionName);
    const updatedFlashcard = await Flashcard.findOneAndUpdate(
      { _id: id, collectionName: collectionName }, // Filter
      { question: newQuestion, answer: newAnswer }, // Update
      { new: true } // Options
    );
    res.status(200).json({
      message: 'updating',
      updatedFlashcard
    });
  } catch (error) {
    res.status(500).json({
      message: 'server problem with updating'
    });
  }
};

exports.deleteFlashcard = async function(req, res, next) {
  const { id } = req.params;
  const { collectionName } = req.body;
  try {
    const Flashcard = createModel(collectionName);
    const deletedFlashcard = await Flashcard.findByIdAndRemove(id);
    res.status(200).json({
      message: 'deleted!',
      deletedFlashcard
    });
  } catch (error) {
    res.status(500).json({
      message: 'cannot delete from the server!'
    });
  }
};
