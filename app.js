// import express module
const express = require('express');
// import logging middleware
// built by express team, it only logs responses
const morgan = require('morgan');
// templating
const nunjucks = require('nunjucks');
// routing
const routes = require('./routes');
// invoke express object to create "app" which has built in methods
const app = express();

// mounts middleware function at the specified path
// defaults to "/" if no path provided
app.use((req, res, next) => {
  console.log("Request Method:", req.method);
  console.log("Request Path:", req.path)
  next(); // allows the following downstream methods to be triggered
});

// using the morgan logging middleware
const logger = morgan('dev');
app.use(logger);

// example data
const locals = {
  title: 'Example',
  people: [
    {name: 'Azula'},
    {name: 'Frodo'},
    {name: 'Hermione'}
  ]
};

// configure templating to work with express!
app.set('view engine', 'html'); // set res.render to work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
// configure nunjucks
nunjucks.configure('views', {
  noCache: true,
  autoescape: true,
  watch: true
});

app.use(express.static('public'));

app.use('/', routes);

// listen on port 3000
app.listen(3000);
console.log('app is running on port 3000');

