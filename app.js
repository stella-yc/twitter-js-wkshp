// import express module
const express = require('express');
// import logging middleware
// built by express team, it only logs responses
const morgan = require('morgan');
// templating
const nunjucks = require('nunjucks');
// routing
const router = require('./routes');
// invoke express object to create "app" which has built in methods
const bodyParser = require('body-parser');
const app = express();
const socketio = require('socket.io');

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

// body parsing middleware
// translates the HTTP message body from url-encoded strings and JSON
// now, every request body will be transformed into a body object attached to the req object.
app.use('/', bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const server = app.listen(3000);
const io = socketio.listen(server);

const routes = router(io);
app.use('/', routes);
