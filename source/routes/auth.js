const express = require("express");
const { authenticate } = require("../services/auth/");

const authRoutes = express.Router();

authRoutes.post('/auth', authenticate);

module.exports = {
    authRoutes
};
