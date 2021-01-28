const axios = require("axios");

const { increaseUsage } = require("../../middleware/store/");
const { insertMovie, getMovies } = require("../../database/");

const getAllMovies = async (req, res) => {
    if (!req.user) {
        return res.status(400).json({ error: "invalid_payload" });
    }

    const { userId } = req.user;

    if (!userId) {
        return res.status(400).json({ error: 'invalid_payload' });
    }

    try {
        const { rows, rowCount } = await getMovies(userId);

        return res.status(200).json({ count: rowCount, data: rows });
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const setMovie = async (req, res) => {
    const { API_KEY } = process.env;

    if (!API_KEY) {
        throw new Error('Missing API_KEY env var. Set it and restart the server');
    }

    if (!req.body || !req.user) {
        return res.status(400).json({ error: "invalid payload" });
    }

    const { title } = req.body;

    const { userId, role } = req.user;

    if (!title || !userId || !role) {
        return res.status(400).json({ error: 'invalid_payload' });
    }

    try {
        const { data } = await axios.get(`http://www.omdbapi.com/?t=${title}&apikey=${API_KEY}`);

        if (!data.Error) {
            const { rowCount } = await insertMovie(userId, data);
            const { Title, Released, Genre, Director } = data;

            if (rowCount === 1) {
                if (role === 'basic') await increaseUsage(userId);

                return res.status(200).json({ 
                    insert: rowCount, 
                    result: 'movie_inserted_successfully', 
                    data: {
                        Title,
                        Released,
                        Genre,
                        Director
                    }
                });
                
            } else {
                return res.status(200).json({ insert: rowCount, result: 'movie_exists', data: [] });
            }
            
        } else {
            return res.status(200).json({ insert: 0, result: 'movie_not_found', data: [] });
        }
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllMovies,
    setMovie
}