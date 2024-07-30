const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
//const { validateJWT } = require('../services/auth/index');
const {
    getSystemSettings,
    getModuleStructureSettings
} = require('../controllers/SystemController');


// System Settings
router.get('/', getSystemSettings);

// System Settings
router.get('/modules-structure', getModuleStructureSettings);



module.exports = router;