const { authFactory, AuthError } = require("./auth");

const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
    throw new Error("Missing JWT_SECRET env var. Set it and restart the server");
}
  
const auth = authFactory(JWT_SECRET);

const authenticate = async (req, res, next) => {
    if (!req.body) {
        return res.status(400).json({ error: "invalid payload" });
    }

    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ error: "invalid payload" });
    }
    
    try {
        const token = auth(username, password);
    
        res.cookie('x-access-token', token, { maxAge: 1000 * 60 * 30 });
        
        return res.status(200).json({ token });
    } catch (error) {
        if (error instanceof AuthError) {
          return res.status(401).json({ error: error.message });
        }
    
        next(error);
    }
};

module.exports = {
    authenticate
};