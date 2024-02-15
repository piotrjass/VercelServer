const express = require('express');
const serverless = require('serverless-http');

const app = express();
app.get('./', (req, res) => {
  res.json({
    path: 'home',
    firstName: 'Max'
  });
});

app.get('/');

module.express.handler = serverless(app);
