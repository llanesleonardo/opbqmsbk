const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
//const { validateJWT } = require('../services/auth/index');
const {
    getSystemSettings
} = require('../controllers/SystemController');


// System Settings
router.get('/', getSystemSettings);



module.exports = router;