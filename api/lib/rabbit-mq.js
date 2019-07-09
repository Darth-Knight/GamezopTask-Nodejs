const RABBIT_MQ_CLIENT = require('amqplib');
const REDIS_CLIENT = require('./redis-client');
const QUEUE_NAME = require('../constants').RABBIT_MQ_QUEUE;
const todoList = require('../controllers/dbController');



function startConsuming() {
    RABBIT_MQ_CLIENT.connect('amqp://localhost').then((conn) => {
        return conn.createChannel();
    }).then((ch) => {
        return ch.assertQueue(QUEUE_NAME).then((ok) => {
            return ch.consume(QUEUE_NAME, (msg) => {
                if (msg !== null) {
                    console.log("the message is" + msg.content.toString());
                    REDIS_CLIENT.get(msg.content.toString()).then((result) => {
                        return todoList.create_a_task(JSON.parse(result), function(err, data) {
                            if (err) {
                                console.log(err);
                                return ;
                            }
                            console.log("Data sucessfully entered data--" + data);
                        });
                    });
                    ch.ack(msg);
                }
            });
        });
    }).catch(console.warn);
}

module.exports = {
    startConsuming: startConsuming,
};

