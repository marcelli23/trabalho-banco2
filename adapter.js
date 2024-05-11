const MongoConnection = require("./mongodb");
const RedisConnection = require("./redisdb");

function createConnection(db) {
  switch (db) {
    case "mongodb":
      return new MongoConnection();
    case "redis":
      return new RedisConnection();
    default:
      return null;
  }
}

module.exports = {
  createConnection,
};
