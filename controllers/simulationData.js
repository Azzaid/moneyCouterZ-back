const express = require('express');
const router = express.Router();

const dbRequester = require('../helpers/dbRequest')("simulationsDb");


router.post('/:userId', function(request, response){
  const errorhandler = error => {
    response.send(err);
    console.debug(err);
  };
  
  const addDbEntry = collection => {
    return new Promise((resolve, reject) => {
      let simulationEntry = {date: new Date(), jointsList: request.body};
      collection.insertOne(simulationEntry, function(err, result){
        if(err){
          reject(err)
        } else {
          console.log(result);
          response.send(result);
          resolve();
        }
      });
    })
  };
  
  dbRequester(request.params.userId, addDbEntry, errorhandler)
});

router.get('/:userId', function(request, response){
  const errorhandler = error => {
    response.send(err);
    console.debug(err);
  };
  
  const getEntrys = collection => {
    return new Promise((resolve, reject) => {
      collection.find().toArray(function(err, result){
        if(err){
          reject(err)
        } else {
          console.log(result);
          response.json(JSON.stringify(result));
          resolve();
        }
      });
    })
  };
  
  dbRequester(request.params.userId, getEntrys, errorhandler)
});

module.exports = router;