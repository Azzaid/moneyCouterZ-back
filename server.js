const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const loginController = require('./controllers/users.js');
const simulationController = require('./controllers/simulationData.js');


const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(function (req, res, next) {
  console.debug('got some request', req.body);
  next();
});

app.use('/simulationData', simulationController);

app.use('/user', loginController);

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('running at: ' + port);
});

module.exports = app;
