const express = require('express');
const serverless = require('serverless-http');
const app = express();
//
// const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');

//routes
const articlesRouter = require('../routes/articlesRoutes');
const authRouter = require('../routes/authRoutes');
const collectionsRouter = require('../routes/collectionsRoutes');
const commentsRouter = require('../routes/commentsRoutes');
const personalCredentialRouter = require('../routes/personalCredentialsRoutes');
const questionRouter = require('../routes/questionRoutes');
const quizRouter = require('../routes/quizRoutes');
const userFavCardRouter = require('../routes/userFavCardsRoutes');
const userFavCollectionsRoutes = require('../routes/userFavCollectionsRoutes');
const userStreakRouter = require('../routes/userStreakRoutes');
const homeRouter = require('../routes/homeRoutes');
const userRouter = require('../routes/userRoutes');
// middleware
// app.use(morgan('dev'));
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);
app.use(helmet());
app.use(express.json({ limit: '10kb' }));
app.use(mongoSanitize());
app.use(xss());
app.use(
  cors({
    origin: '*'
  })
);
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
  app.use('/.netlify/functions/api', router);
});

module.exports.handler = serverless(app);
