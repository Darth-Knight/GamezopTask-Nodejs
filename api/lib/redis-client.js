const redis = require('redis-url');
const Constants = require('../constants');


const {get, deleteKey} = function() {
    let redisClient;
    let redisConnected = false;
    function connect_to_redis(){
        redisClient = redis.createClient(Constants.REDIS_CLIENT_URL);
        redisClient.on('connect', function() {
            console.log('Redis client connected');
        });
        redisClient.on('error', function (err) {
            console.log('Something went wrong ' + err);
        });
    }
    function get(key){
        return new Promise((resolve, reject) => {
            if (!redisConnected) {
                redisConnected = true;
                connect_to_redis();
            }
            return redisClient.get(key, function (error, result) {
                if (error) {
                    console.log(error);
                    reject(error);
                }
                resolve(result);
            });
        });
    }
    function deleteKey(key){
        return new Promise((resolve, reject) => {
            if (!redisConnected) {
                redisConnected = true;
                connect_to_redis();
            }
            return redisClient.del(key, function (error, result) {
                if (error) {
                    console.log(error);
                    reject(error);
                }
                resolve(result);
            });
        });
    }


    return {get, deleteKey};
}();


module.exports = {
    get: get,
    deleteKey:deleteKey
};
