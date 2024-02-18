const express = require('express');
const serverless = require('serverless-http');
const app = express();
const router = express.Router();

router.get('/', (req, res) => {
  res.send('App is running..');
});

// const articlesRouter = require('../routes/articlesRoutes');
// const authRouter = require('../routes/authRoutes');
// const collectionsRouter = require('../routes/collectionsRoutes');
// const commentsRouter = require('../routes/commentsRoutes');
// const personalCredentialRouter = require('../routes/personalCredentialsRoutes');
// const questionRouter = require('../routes/questionRoutes');
// const quizRouter = require('../routes/quizRoutes');
// const userFavCardRouter = require('../routes/userFavCardsRoutes');
// const userFavCollectionsRoutes = require('../routes/userFavCollectionsRoutes');
// const userStreakRouter = require('../routes/userStreakRoutes');
// //
// const homeRouter = require('../routes/homeRoutes');
// const userRouter = require('../routes/userRoutes');
// //
// const routers = [
//   userRouter,
//   articlesRouter,
//   authRouter,
//   collectionsRouter,
//   commentsRouter,
//   personalCredentialRouter,
//   questionRouter,
//   quizRouter,
//   userFavCardRouter,
//   userFavCollectionsRoutes,
//   userStreakRouter,
//   homeRouter
// ];

// routers.forEach(router => {
//   app.use('/api/v1', router);
// });
// app.use('/.netlify/functions/api', router);
app.use(router);
module.exports.handler = serverless(app);

// app.use('/.netlify/functions/api', router);
// module.exports.handler = serverless(app);
