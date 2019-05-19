const mongodb = require("mongodb");
const express = require('express');

const uri = "mongodb+srv://Azzaid:cdOWFJqrHLI9VNVM@azzaidmdb-r422z.mongodb.net/test";
const mongoClient = new mongodb.MongoClient(uri);

const router = express.Router();

router.get('/new', function(request, response){
  mongoClient.connect(function(err, client){
    
    if(err){
      client.close();
      response.status(500).send(err);
      return console.log(err);
    }
    
    const db = client.db("usersdb");
    const collection = db.collection("users");
    
    let user = {login: request.body.userName, password: request.body.passWord};
    
    collection.insertOne(user, function(err, result){
      
      if(err){
        client.close();
        response.status(500).send(err);
        return console.log(err);
      }
      console.log(result.ops);
      response.status(200).send(result['_id']);
    });
    
    client.close();
  });
});

