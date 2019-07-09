const redis = require('redis');

const {get} = function() {
    let redisClient;
    let redisConnected = false;
    function connect_to_redis(){
        redisClient = redis.createClient();
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
    return {get};
}();


module.exports = {
    get: get,
};
