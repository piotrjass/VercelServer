const mongoose = require('mongoose');
const moment = require('moment');
const User = require('./userModel');

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Please provide a text']
  },
  date: {
    type: String,
    default: moment().format('DD-MM-YYYY')
  },
  author: [
    {
      _id: String,
      name: String,
      email: String,
      role: String
    }
  ],
  authorReference: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Every comment has an author']
    }
  ],
  articleReference: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Article',
      required: [true, 'Every comment is attached to an article!']
    }
  ]
  // articleReference: [
  //   {
  //     type: mongoose.Schema.ObjectId,
  //     ref: 'Article',
  //     required: [true, 'Comments has to be attached to an article!']
  //   }
  // ]
});

// embedding the author data
commentSchema.pre('save', async function(next) {
  const authorPromise = this.author.map(async id => await User.findById(id));
  this.author = await Promise.all(authorPromise);
  next();
});

// populating the data with selected fields
commentSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'authorReference',
    select:
      '-favourites -favouriteCards -daysStreak -resourcesStarted -resourcesEnded -answeredQuestion -__v -dateOfLastLogin'
  });
  next();
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
