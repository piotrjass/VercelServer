const express = require('express');

const router = express.Router();

// Definiowanie trasy dla '/home'
router.get('/home', (req, res) => {
  res.send('Hello from home!');
});

module.exports = router;
