module.exports = {
    WORKERS : process.env.QUEUE_NAME || 1,
    RABBIT_MQ_QUEUE : process.env.QUEUE_NAME || 'redisKeys',
    REDIS_CLIENT_URL : process.env.REDIS_URL || '',
    MONGODB_CLIENT_URI : process.env.MONGODB_URI || 'mongodb://localhost/Tododb',
    RABBIT_QUEUE_CLIENT_URL : process.env.CLOUDAMQP_URL || 'amqp://localhost',
    PORT : process.env.PORT || 3000,
};