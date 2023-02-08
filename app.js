const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const routes = require('./api/routes');

const createApp = () => {
  const app = express();

  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(routes);

  app.get('/ping', (req, res) => {
    res.json({ message: 'pong' });
  });
  return app;
};

module.exports = { createApp };
