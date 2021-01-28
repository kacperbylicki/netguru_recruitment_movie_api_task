const generateId = (payload) => {

    const { DB_SECRET } = process.env;
    const { uid, Title } = payload;

    return require("crypto")
    .createHash("sha1")
    .update(`${Title}_${uid}_${DB_SECRET}`)
    .digest("hex")
};

module.exports = {
    generateId
};