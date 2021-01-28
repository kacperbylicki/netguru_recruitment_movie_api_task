const jwt = require("jsonwebtoken");

const verifyAuth = (req, res, next) => {
    let token = req.cookies['x-access-token'] || req.headers['authorization'];

    if (!token) {
        return res.status(400).json({ error: 'invalid_payload' });
    }

    if (token.includes("Bearer")) {
        token = token.split(' ')[1];
    }

    try {
        const { JWT_SECRET } = process.env;

        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = {
            userId: decoded.userId,
            name: decoded.name,
            role: decoded.role,
            iat: decoded.iat,
            exp: decoded.exp,
            iss: decoded.iss,
            sub: decoded.sub
        };

        next();
    } catch (error) {
        return res.status(403).json({ error: 'access_refused' });
    }
};

module.exports = {
  verifyAuth
};