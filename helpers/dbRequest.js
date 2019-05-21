const mongodb = require("mongodb");
const mongoDbConfig = require('../config/mongoDbConfig.js');


function getMongoDbRequester(dbName) {
  return (
    (collectionName, asyncRequestFunction, errorHandler) => {
      console.log('accesing the collection');
      
      const mongoClient = new mongodb.MongoClient(mongoDbConfig.uri, mongoDbConfig.options);
      mongoClient.connect(function(err, client){
        
        if(err){
          errorHandler(err);
          return console.log('got error', err);
        }
        
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        
        asyncRequestFunction(collection)
          .then(() => {
            console.log('asynch request succed');
            client.close();
          })
          .catch(err => {
            errorHandler(err);
            client.close();
          });
      },
        {useNewUrlParser: true});
    }
    );
}

module.exports = getMongoDbRequester;