const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a question title'],
    unique: true
  },
  answers: {
    type: Array,
    required: [true, 'Please provide answers for the question'],
    unique: true
  },
  correctAnswer: {
    type: String,
    required: [true, 'Please provide correct answer']
  },
  type: {
    type: String,
    default: 'question'
  }
});
// function createModel(databaseName) {
//   return mongoose.model(databaseName, questionSchema);
// }
const User = mongoose.model('Database', questionSchema);
module.exports = User;
