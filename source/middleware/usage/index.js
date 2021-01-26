const verifyUsage = async () => {
    const { userId, role } = req.user;

    if (role === 'premium') next();



};

module.exports = {
    verifyUsage
};