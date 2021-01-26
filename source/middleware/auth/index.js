const jwt = require("jsonwebtoken");

const verifyUser = async (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'invalid_payload' });
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
        return res.status(401).json({ error: 'unauthorized' });
    }
};

module.exports = {
    verifyUser
}