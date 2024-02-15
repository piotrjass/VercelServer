const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Please provide a question title'],
    unique: true
  },
  answer: {
    type: String,
    required: [true, 'Please provide answer'],
    unique: true
  },
  type: {
    type: String,
    default: 'flashcard'
  },
  collectionName: {
    type: String,
    required: [true, 'Please provide a collection name']
  }
});

const createModel = collection => {
  return mongoose.model('Flashcard', flashcardSchema, collection);
};
module.exports = { createModel };

// const Flashcard = mongoose.model('Database', flashcardSchema, 'collection');
// module.exports = {
//   Flashcard,
//   flashcardSchema
// };
