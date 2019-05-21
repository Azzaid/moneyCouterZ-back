const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectID;

const dbRequester = require('../helpers/dbRequest')("simulationsDb");

router
  .get('/:userId', function(request, response){
  console.log('providing data');
  const errorhandler = error => {
    console.log('got error');
    response.status(500);
    response.send(error);
    console.debug(error);
  };
  
  const getEntrys = collection => {
    return new Promise((resolve, reject) => {
      console.log('searching the collection');
      collection.find().toArray(function(err, result){
        if(err){
          console.log('search failed');
          reject(err)
        } else {
          console.log('got result', result);
          response.header('Access-Control-Allow-Headers', '*');
          response.json(JSON.stringify(result));
          resolve();
        }
      });
    })
  };
  
  dbRequester(request.params.userId, getEntrys, errorhandler)
})
  .post('/:userId', function(request, response){
  console.log('got new data');
  
    const errorhandler = error => {
      console.log('got error');
      response.status(500);
      response.send(error);
      console.debug(error);
    };
  
  const addDbEntry = collection => {
    return new Promise((resolve, reject) => {
      let simulationEntry = {date: new Date(), jointsList: request.body};
      collection.insertOne(simulationEntry, function(err, result){
        if(err){
          reject(err)
        } else {
          response.send(result);
          resolve();
        }
      });
    })
  };
  
  dbRequester(request.params.userId, addDbEntry, errorhandler)
})
  .delete('/:userId/:entryId', function(request, response){
  console.log('deleting data');
  
  const errorhandler = error => {
    console.log('got error');
    response.status(500);
    response.send(error);
    console.debug(error);
  };
  
  const removeDbEntry = collection => {
    return new Promise((resolve, reject) => {
      console.log('deleting entry with id', request.params.entryId);
      collection.deleteOne({'_id': ObjectId(request.params.entryId)}, function(err, result){
        if(err){
          reject(err)
        } else {
          response.send(result);
          resolve();
        }
      });
    })
  };
  
  dbRequester(request.params.userId, removeDbEntry, errorhandler)
});

module.exports = router;