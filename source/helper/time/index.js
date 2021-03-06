const moment = require("moment");

const firstOfNextMonth = () => {
    const now = moment();

    const startOfMonth = moment().add(1, 'month').startOf('month').unix();

    return +(startOfMonth - now.unix());
};

module.exports = {
    firstOfNextMonth
}
