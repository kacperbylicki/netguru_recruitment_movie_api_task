const redis = require("redis");

const verifyUsage = async () => {
    const { role } = req.user;

    if (role === 'premium') next();

};

module.exports = {
    verifyUsage
};