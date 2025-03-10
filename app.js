const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const serverless = require('serverless-http');
// Routes
const articlesRouter = require('./routes/articlesRoutes');
const authRouter = require('./routes/authRoutes');
const collectionsRouter = require('./routes/collectionsRoutes');
const commentsRouter = require('./routes/commentsRoutes');
const personalCredentialRouter = require('./routes/personalCredentialsRoutes');
const questionRouter = require('./routes/questionRoutes');
const quizRouter = require('./routes/quizRoutes');
const userFavCardRouter = require('./routes/userFavCardsRoutes');
const userFavCollectionsRoutes = require('./routes/userFavCollectionsRoutes');
const userStreakRouter = require('./routes/userStreakRoutes');
//
const homeRouter = require('./routes/homeRoutes');
//
const userRouter = require('./routes/userRoutes');
// 1) Development loggin
const app = express();
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// 2) Limit requests from same API

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);
// 3) Security
app.use(helmet());
// 4) Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
//  5) Data sanitization against NoSQL query injection
app.use(mongoSanitize());
//  6) Data sanitization against XSS
app.use(xss());
// 7) Cors cofigure
app.use(
  cors({
    origin: '*'
  })
);
// 8) Body parsing and compression
app.use(bodyParser.json());
app.use(compression());

const routers = [
  userRouter,
  articlesRouter,
  authRouter,
  collectionsRouter,
  commentsRouter,
  personalCredentialRouter,
  questionRouter,
  quizRouter,
  userFavCardRouter,
  userFavCollectionsRoutes,
  userStreakRouter,
  homeRouter
];

routers.forEach(router => {
  app.use('/api/v1', router);
});

module.exports = app;
// module.exports.handler = serverless;
