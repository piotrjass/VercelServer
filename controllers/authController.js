const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

const signInJWTToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new Error('Credentials not found!', 404));
  const user = await User.findOne({ email }).select('+password');
  const correct = await user.correctPassword(password, user.password);
  if (!user || !correct) return next(new Error('Incorrect credentials'), 401);
  const token = signInJWTToken(user._id);

  res.status(200).json({
    status: 'successful login!',
    token,
    message: 'you are logged in successfully'
  });
};

exports.verifyToken = async (req, res, next) => {
  const token = await req.headers.authorization.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'No authorization' });
  }
  try {
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json(decodedToken);
  } catch (err) {
    return res.status(403).json({ message: 'Incorrect token' });
  }
};
