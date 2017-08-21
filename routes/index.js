const express = require('express');

const router = express.Router();

const tweetBank = require('../tweetBank');

module.exports = (io) => {
  router.get('/', (req, res, next) => {
    let tweets = tweetBank.list();
    res.render('index', { tweets: tweets, showForm: true });
  });

  router.get('/users/:name', (req, res, next) => {
    const name = req.params.name;
    const list = tweetBank.find( {name: name});
    res.render( 'index', {tweets: list, showForm: true, name: name});
  });

  router.get('/tweets/:id', (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    let tweet = tweetBank.find({id: id});
    res.render('index', {tweets: tweet});
  });

  router.post('/tweets', (req, res, next) => {
    const name = req.body.name;
    const text = req.body.text;
    tweetBank.add(name, text);
    io.sockets.emit('newTweet', {name, text});
    res.redirect('/');
  });
 return router;
};
