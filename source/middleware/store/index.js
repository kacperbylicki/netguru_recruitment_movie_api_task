const { promisifyAll } = require('bluebird');
const redisAsync = promisifyAll(require('redis')); 
const { firstOfNextMonth }  = require('../../helper/time');

const { REDIS_PORT, REDIS_HOST, REDIS_PASSWORD } = process.env;

if (!REDIS_PORT || !REDIS_HOST || !REDIS_PASSWORD) {
    throw new Error('Missing REDIS_PORT or REDIS_HOST or REDIS_PASSWORD env var. Set it and restart the server');
}

class RedisError extends Error {}

const setUsage = async (uid) => {
    try {
        if (!uid) throw new RedisError('invalid_id');
    
        const client = redisAsync.createClient({ 
            host: REDIS_HOST, 
            port: REDIS_PORT,
            password: REDIS_PASSWORD
        });

        const secondsToNextMonth = firstOfNextMonth();

        const redis_res = await client.setAsync(`request_count_${uid}`, 0, 'EX', secondsToNextMonth);
    
        if (redis_res === 'OK') return { usage: 0 };
        
    } catch (error) {
        throw new RedisError(error);
    }
};

const getUsage = async (uid) => {
    try {
        if (!uid) throw new RedisError('invalid_id');

        const client = redisAsync.createClient({ 
            host: REDIS_HOST, 
            port: REDIS_PORT,
            password: REDIS_PASSWORD
        });

        const redis_res = await client.getAsync(`request_count_${uid}`);

        return { usage: redis_res };

    } catch (error) {
        throw new RedisError(error);
    }
};

const increaseUsage = async (uid) => {
    try {
        if (!uid) throw new RedisError('invalid_id');

        const client = redisAsync.createClient({ 
            host: REDIS_HOST, 
            port: REDIS_PORT,
            password: REDIS_PASSWORD
        });
        
        const redis_res = await client.incrAsync(`request_count_${uid}`);

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


