const express = require("express");
const { verifyUser } = require("../middleware/auth");
const { verifyUsage } = require("../middleware/usage")

const movieRoutes = express.Router();

const fetchMoviesByUID = async (req, res) => {

};

const setMovieByUID = async (req, res) => {
    const { title } = req.body;

    const {} = await axios.get(`http://www.omdbapi.com/?t=${title}`);
};

movieRoutes.get('/movies', verifyUser, fetchMoviesByUID);
movieRoutes.post('/movies', verifyUser, verifyUsage, setMovieByUID);

module.exports = {
    movieRoutes
}