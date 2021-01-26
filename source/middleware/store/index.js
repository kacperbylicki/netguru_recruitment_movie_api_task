const redis = require('redis');
const { promisifyAll } = require('bluebird');
const { REDIS_PORT, REDIS_HOST } = process.env;

class RedisError extends Error {}

if (!REDIS_PORT || !REDIS_HOST) {
    throw new Error('Missing REDIS_PORT or REDIS_HOST env var. Set it and restart the server');
}

const redisAsync = promisifyAll(redis);

const setUsage = async (id) => {
    if (!id) {
        throw new RedisError('invalid_id')
    }

    const client = redisAsync.createClient(REDIS_PORT);

    return await client.setAsync(`request_count_${id}`, 0, 'EX', 2628000);
};

const getUsage = async (id) => {
    if (!id) {
        throw new RedisError('invalid_id')
    }

    const client = redisAsync.createClient(REDIS_PORT);

    return await client.getAsync(`request_count_${id}`);
};

const increaseUsage = async (id) => {
    if (!id) {
        throw new RedisError('invalid_id')
    }

    const client = redisAsync.createClient(REDIS_PORT);

    return await client.incrAsync(`request_count_${id}`);
};

module.exports = {
    setUsage,
    getUsage,
    increaseUsage
}


