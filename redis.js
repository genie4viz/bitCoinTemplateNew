let redis = require("async-redis");
let ENV = require('./config')
let client = redis.createClient({
    host: ENV.REDIS_HOST
});

exports.clientRedis = client
