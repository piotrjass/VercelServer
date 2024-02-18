// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config({ path: '.env' });
const http = require('http');
const mongoose = require('mongoose');
// const app = require('./app');
const app = require('./app');
// conne
const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    dbName: 'JSQuiz',
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT;
// eslint-disable-next-line no-unused-vars

// eslint-disable-next-line no-unused-vars
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
// const server = app.listen(port, () => {
//   console.log(`App running on port ${port}...`);
// });
