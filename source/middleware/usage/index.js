const { 
    getUsage, 
    setUsage, 
    increaseUsage, 
    RedisError 
} = require("../store");

const verifyUsage = async (req, res, next) => {
    if (!req.user) {
        return res.status(400).json({ error: "invalid payload" });
    }

    const { userId, role } = req.user;

    if (!userId || !role) {
        return res.status(400).json({ error: 'invalid_payload' });
    }

    try {
        if (role === "premium") {
            next();
        } else {
            const { usage } = await getUsage(userId) === null ? await setUsage(userId) : await increaseUsage(userId);

            if (usage > 5) {
                return res.status(403).json({ error: 'monthly_usage_exceed' });
            }

            next();
        }

    } catch (error) {
        if (error instanceof RedisError) {
            return res.status(500).json({ error: error.message });
        }

        next(error);
    }
};

module.exports = {
    verifyUsage
};