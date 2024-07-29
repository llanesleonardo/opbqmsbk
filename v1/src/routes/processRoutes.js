const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
//const { validateJWT } = require('../services/auth/index');
const {
    getProcesses
} = require('../controllers/processController');



// All projects Profile
router.get('/', getProcesses);



module.exports = router;