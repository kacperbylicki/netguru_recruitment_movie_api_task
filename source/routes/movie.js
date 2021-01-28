const express = require("express");

const { verifyAuth } = require("../services/movie/auth");
const { verifyUsage } = require("../middleware/usage/");

const { getAllMovies, setMovie } = require("../services/movie/");

const movieRoutes = express.Router();

movieRoutes.get('/movies', verifyAuth, getAllMovies);
movieRoutes.post('/movies', verifyAuth, verifyUsage, setMovie);

module.exports = {
    movieRoutes
}