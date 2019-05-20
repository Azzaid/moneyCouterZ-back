const express = require('express');

const loginController = require('./controllers/users.js');
const simulationController = require('./controllers/simulationData.js');


const app = express();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  console.log('got some request');
  next();
});
app.use('/user', loginController);
app.use('/simulationData', simulationController);

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('running at: ' + port);
});

module.exports = app;
