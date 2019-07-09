module.exports = {
    WORKERS: 1,
    RABBIT_MQ_QUEUE: process.env.QUEUE_NAME || 'redisKeys',
};