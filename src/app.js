const routes = require('./routes');
const express = require('express');
const cors = require('cors');
const compression = require('compression');

const app = express();

app.set('port', process.env.PORT || 5050);
app.use(compression());
app.use(express.json());
app.use(cors());

app.use((_, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(routes);

module.exports = app;
