const express = require('express');

const loginController = require('./routes/loginController.js');


const app = express();
app.use('/user', loginController);

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('running at: ' + port);
});

module.exports = app;
