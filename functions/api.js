const express = require('express');
const serverless = require('serverless-http');
const app = express();
const router = express.Router();

let records = [];

router.get('/', (req, res) => {
  res.send('App is running..');
});

router.post('/add', (req, res) => {
  res.send('New record added.');
});

router.delete('/', (req, res) => {
  res.send('Deleted existing record');
});
router.put('/', (req, res) => {
  res.send('Updating existing record');
});
router.get('/demo', (req, res) => {
  res.json([
    {
      id: '001',
      name: 'Smith',
      email: 'smith@gmail.com'
    },
    {
      id: '002',
      name: 'Sam',
      email: 'sam@gmail.com'
    },
    {
      id: '003',
      name: 'lily',
      email: 'lily@gmail.com'
    }
  ]);
});

app.use('/', router);
module.exports.handler = serverless(app);
