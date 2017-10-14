'use strict';

const uuid = require('uuid');
const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();
const app = express();

const blogRouter = require('./blogRouter');

// Data functions
const {BlogPosts} = require('./models');

// Log to the HTTP layer
app.use(morgan('common'));

app.use(express.static('public'));

app.use('/blog-posts', blogRouter);

// input both runServer and closeServer to access the same server objects.

let server;

function runServer() {
  const port = process.env.PORT || 8080;
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      console.log(`Your app is listening on port ${port}`);
      resolve(server);
    }).on('error', err => {
      reject(err)
    });
  });
}



// app.listen(process.env.PORT || 8080, () => {
//   console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
// });