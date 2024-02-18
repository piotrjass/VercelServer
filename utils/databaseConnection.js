const mongoose = require('mongoose');

const connectToDatabase = async () => {
  const DB = process.env.DATABASE;

  try {
    await mongoose.connect(DB, {
      dbName: 'JSQuiz',
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
  } catch (error) {
    console.error('DB connection error:', error.message);
  }
};

module.exports = { connectToDatabase };
