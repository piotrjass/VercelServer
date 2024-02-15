// const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const moment = require('moment');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  role: {
    type: String,
    enum: ['user', 'moderator', 'expert', 'admin'],
    default: 'user'
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!'
    }
  },
  favourites: {
    type: Array,
    required: true,
    default: []
  },
  favouriteCards: {
    type: Array,
    required: true,
    default: []
  },
  dateOfLastLogin: {
    type: String,
    required: true,
    default: () => moment().format('DD-MM-YYYY')
  },
  daysStreak: {
    type: Number,
    required: true,
    default: 0
  },
  resourcesStarted: {
    type: Array,
    required: true,
    default: []
  },
  resourcesEnded: {
    type: Array,
    required: true,
    default: []
  },
  answeredQuestion: {
    type: Number,
    required: true,
    default: 0
  }
});

userSchema.pre('save', async function(next) {
  // not using it when user for example changes email! - this is guard close!
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
// this metod hashes the user given password and compare it with the encrypted password in the database
userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
