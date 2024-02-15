const mongoose = require('mongoose');
const moment = require('moment');
const User = require('./userModel');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title']
  },
  desc: {
    type: String,
    required: [true, 'Please provide a descirption']
  },
  content: {
    type: String,
    required: [true, 'Please provide a descirption']
  },
  date: {
    type: String,
    default: moment().format('DD-MM-YYYY')
  },
  tags: {
    type: Array
  },
  author: [
    {
      _id: String,
      name: String,
      email: String,
      role: String
    }
  ],
  commentsReference: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Comment',
      required: [true, 'Every comment is attached to an article!'],
      default: []
    }
  ],
  authorReference: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Every article has an author']
    }
  ]
});

articleSchema.pre('save', async function(next) {
  const authorPromise = this.author.map(async id => await User.findById(id));
  this.author = await Promise.all(authorPromise);
  next();
});

// populating the data with selected fields
articleSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'authorReference',
    select:
      '-favourites -favouriteCards -daysStreak -resourcesStarted -resourcesEnded -answeredQuestion -__v -dateOfLastLogin'
  });
  next();
});
articleSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'commentsReference',
    select: '-authorReference -articleReference -__v -_id'
  });
  next();
});

const Article = mongoose.model('Article', articleSchema);
module.exports = Article;
