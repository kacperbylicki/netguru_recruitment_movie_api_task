const redis = require('redis');
const { promisifyAll } = require('bluebird');
const { REDIS_PORT, REDIS_HOST } = process.env;

if (!REDIS_PORT || !REDIS_HOST) {
    throw new Error('Missing REDIS_PORT or REDIS_HOST env var. Set it and restart the server');
}

class RedisError extends Error {}

const redisAsync = promisifyAll(redis);

const setUsage = async (id) => {
    try {
        if (!id) throw new RedisError('invalid_id');
    
        const client = redisAsync.createClient(REDIS_PORT);
    
        const redis_res = await client.setAsync(`request_count_${id}`, 0, 'EX', 2628000);
    
        if (redis_res === 'OK') return { usage: 0 };
        
    } catch (error) {
        throw new RedisError(error);
    }
};

const getUsage = async (id) => {
    try {
        if (!id) throw new RedisError('invalid_id');

        const client = redisAsync.createClient(REDIS_PORT);

        const redis_res = await client.getAsync(`request_count_${id}`);

        return { usage: redis_res };

    } catch (error) {
        throw new RedisError(error);
    }
};

const increaseUsage = async (id) => {
    try {
        if (!id) throw new RedisError('invalid_id');

        const client = redisAsync.createClient(REDIS_PORT);

        const redis_res = await client.incrAsync(`request_count_${id}`);

        return { usage: redis_res };

    } catch (error) {
        throw new RedisError(error);
    }
};

module.exports = {
    setUsage,
    getUsage,
    increaseUsage,
    RedisError
}


