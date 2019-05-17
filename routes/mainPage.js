/**
 * Created by p.zamulko on 05.05.2018.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.render('index');
});

module.exports = router;