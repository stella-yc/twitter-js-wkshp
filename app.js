// import express module
const express = require('express');
// import logging middleware
// built by express team, it only logs responses
const morgan = require('morgan');

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

//

app.get('/', (req, res) => {
  res.send('hello visitor');
});

app.get('/news', (req, res) => {
  res.send('this is the news page');
});

// listen on port 3000
app.listen(3000);
console.log('app is running on port 3000');

