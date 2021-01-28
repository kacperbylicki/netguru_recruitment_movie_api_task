const { pool } = require("./pool");
const { generateId } = require("../helper/generator");

class PostgresError extends Error {}

const insertMovie = async (uid, data) => {
    const query = `
        INSERT INTO movies (_id, uid, title, released_at, genre, director) 
        VALUES ($1, $2, $3, $4, $5, $6) 
        ON CONFLICT (_id) 
        DO NOTHING;
    `;

    const { Title, Released, Genre, Director } = data;

    const released = Released === `N/A` ? null : Released;

    const _id = generateId({ uid, Title });
    
    const batchArray = [
        _id,
        uid,
        Title,
        released,
        Genre,
        Director
    ];

    try {

        return { rowCount } = await pool.query(query, batchArray);

    } catch (error) {
        if (`${error}`.includes("ECONNREFUSED")) {
            throw new PostgresError("database_connection_refused");
        }

        throw new PostgresError(error);
    }
};

const getMovies = async (uid) => {
    const query = `
        SELECT _id, title, released_at, genre, director FROM movies WHERE uid = $1;
    `;

    try {

        return { rows } = await pool.query(query, [uid]);

    } catch (error) {
        if (`${error}`.includes("ECONNREFUSED")) {
            throw new PostgresError("database_connection_refused");
        }

        throw new PostgresError(error);
    }
};

module.exports = {
    insertMovie,
    getMovies
}