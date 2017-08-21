const express = require('express');

const router = express.Router();

const tweetBank = require('../tweetBank');

router.get('/', (req, res, next) => {
  console.log('i am in router get');
  let tweets = tweetBank.list();
  res.render('index', { tweets: tweets });
});

module.exports = router;
