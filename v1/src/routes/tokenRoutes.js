const express = require('express');
const router = express.Router();
const { validateJWT } = require('../services/auth/jwtStrategy');
const { getTokens, getRefreshTokens, checkRefreshTokens, createNewTokenBasedOnRefreshtoken } = require('../controllers/tokenController');


router.get('/', getTokens);
router.get('/rtokens', getRefreshTokens);
router.get('/refreshtoken', checkRefreshTokens);
router.post('/', createNewTokenBasedOnRefreshtoken);


module.exports = router;