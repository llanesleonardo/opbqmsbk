const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
//const { validateJWT } = require('../services/auth/index');
const {
    getDefects
} = require('../controllers/defectController');



// All projects Profile
router.get('/', getDefects);



module.exports = router;