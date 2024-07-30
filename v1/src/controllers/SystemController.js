const {settings}  = require("../data/settings");

const getSystemSettings = (req, res) => {
    const systemSettingsData = settings;
    res.json(systemSettingsData);
};


const getModuleStructureSettings = (req, res) => {
    const modulesSettingData = settings.modulesSettings;
    res.json(modulesSettingData.modulesStructure);
};


module.exports = { getSystemSettings,getModuleStructureSettings };