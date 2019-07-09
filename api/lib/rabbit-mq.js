const RABBIT_MQ_CLIENT = require('amqplib');
const REDIS_CLIENT = require('./redis-client');
const todoList = require('../controllers/dbController');
const Constants = require('../constants');
const QUEUE_NAME = Constants.RABBIT_MQ_QUEUE;

console.log(QUEUE_NAME);


function startConsuming() {
    RABBIT_MQ_CLIENT.connect(Constants.RABBIT_QUEUE_CLIENT_URL).then((conn) => {
        return conn.createChannel();
    }).then((channel) => {

        return channel.assertQueue(QUEUE_NAME).then((ok) => {
            return channel.consume(QUEUE_NAME, (msg) => {
                if (msg !== null) {
                    var key = msg.content.toString();
                    console.log("the key form queue  is" + key);
                    REDIS_CLIENT.get(key).then((result) => {
                        return todoList.create_a_task(JSON.parse(result), function(err, data) {
                            if (err) {
                                console.log(err);
                                return ;
                            }
                            console.log("Data sucessfully entered data--" + data);
                            REDIS_CLIENT.deleteKey(key);
                            console.log("Key sucessfully deleted --" + key);
                        });
                    });
                    channel.ack(msg);
                }
            });
        });
    }).catch(console.warn);
}

module.exports = {
    startConsuming: startConsuming,
};

