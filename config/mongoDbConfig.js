const mongoDbConfig = {
  uri:"mongodb+srv://Azzaid:cdOWFJqrHLI9VNVM@azzaidmdb-r422z.mongodb.net/test",
  options: {poolSize: 10, reconnectTries: Number.MAX_VALUE, reconnectInterval: 1000}
};

module.exports = mongoDbConfig;