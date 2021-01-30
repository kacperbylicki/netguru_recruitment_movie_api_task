const { 
    getUsage, 
    setUsage, 
    RedisError 
} = require("../store/");

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
            const { usage } = await getUsage(userId);

            if (+usage < 5 && usage !== null)  {
                next();
            }

            if (usage === null) {
                await setUsage(userId);

                next();
            }

            if (+usage >= 5) {
                return res.status(403).json({ error: 'monthly_usage_exceed' });
            }
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
