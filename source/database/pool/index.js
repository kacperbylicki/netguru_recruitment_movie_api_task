const { Pool } = require("pg");

const { 
    NODE_ENV,
    POSTGRES_HOST,
    POSTGRES_TEST_HOST,
    POSTGRES_PORT,
    POSTGRES_TEST_PORT
} = process.env; 

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: NODE_ENV === 'test' ? POSTGRES_HOST : POSTGRES_TEST_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: NODE_ENV === 'test' ? POSTGRES_PORT : POSTGRES_TEST_PORT,
});

module.exports = {
    pool
};