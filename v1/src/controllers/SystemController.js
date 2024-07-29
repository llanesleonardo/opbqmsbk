const {settings}  = require("../data/settings");

const getSystemSettings = (req, res) => {
    const systemSettingsData = settings;
    res.json(systemSettingsData);
};

module.exports = { getSystemSettings };