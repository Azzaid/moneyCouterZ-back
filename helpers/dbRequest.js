const mongodb = require("mongodb");
const mongoDbConfig = require('../config/mongoDbConfig.js');


function getMongoDbRequester(dbName) {
  const mongoClient = new mongodb.MongoClient(mongoDbConfig.uri);
  
  return (
    (collectionName, asyncRequestFunction, errorHandler) => {
      console.log('truing to write data to collection');
      mongoClient.connect(function(err, client){
        
        if(err){
          errorHandler(err);
          return console.log(err);
        }
        
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        
        console.log('some promise', asyncRequestFunction(collection));
        
        asyncRequestFunction(collection)
          .then(() => {
            client.close();
          })
          .catch(err => {
            errorHandler(err);
            client.close();
          });
      }
      ,{useNewUrlParser: true});
    }
    );
}

module.exports = getMongoDbRequester;