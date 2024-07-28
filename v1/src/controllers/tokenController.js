const { users, refreshTokens } = require('../database/models/predefinedArrayUserModel');
const { generateJwt, verifyRefreshToken, validateJWT } = require('../services/auth/jwtStrategy');

const getTokens = (req,res) => { 
    res.json({msg:'tokens'});
};

const getRefreshTokens = (req, res) => {
    /*   if (refreshTokens.length === 0) {
           return res.json({ msg: 'No existe ningun refresh token' });
       }*/
    console.log(refreshTokens.length);
    res.json(refreshTokens);
}


const checkRefreshTokens = (req, res) => {

    const { refresh_token } = req.body;
    // REVIEW IF CHECK TOKEN IS NEEDED
    console.log(refresh_token);
    if (!refresh_token) {
        return res.json({ msg: 'No existe el refresh token' });
    }

    verifyRefreshToken(refresh_token, req);
    res.json(req.user);
};


const createNewTokenBasedOnRefreshtoken = async () => {
    //REVIEW  IF CHECK TOKEN IS NEEDED
    //CHECK COOKIE IS INCLUDED IN THE REQUEST
    const { refresh_token } = req.body;

    if (refresh_token === null) {
        return res.sendStatus(401);
    }

    if (!refreshTokens.find(rt => rt.refreshtoken === refresh_token)) {

        return res.status(403).send('Something went wrong. try again!');
    }

    console.log(refreshTokens, refresh_token);
    const decodedRefreshToken = await verifyRefreshToken(refresh_token);
    console.log('decodedRefreshToken', decodedRefreshToken);
    const user = users.find(user => user.id === decodedRefreshToken.id);

    if (!user) {
        res.status(400).json({ message: 'error' });
    } else {
        console.log(user);
        const newToken = generateJwt(user);
        user.token = newToken;
        res.cookie('Token', { "id": user.id, "token": newToken });

        res.json({ message: 'Token refreshed successfully', user });
    }

};

module.exports = { getTokens,getRefreshTokens, checkRefreshTokens, createNewTokenBasedOnRefreshtoken }