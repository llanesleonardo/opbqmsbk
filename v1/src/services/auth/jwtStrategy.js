const jwt = require("jsonwebtoken");
require('dotenv').config()

const jwtSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.ACCESS_REFRESH_TOKEN_SECRET;
const resetJwt = process.env.RESET_PASSWORD_SECRET;

const generateJwt = (user) => {
    return jwt.sign(user, jwtSecret, { expiresIn: '60s' })
}

const generateRefreshJwt = (user) => {
    return jwt.sign(user, refreshTokenSecret, { expiresIn: '7d' })
}

const generateResetJwt = (user) => {
    return jwt.sign(user, resetJwt, { expiresIn: '20m' })
}

const verifyRefreshToken = (refreshToken, req) => {
    //const token = req.cookies.jwt;
    if (!refreshToken) {
        return res.sendStatus(401); // Unauthorized
    }
    try {
        const user = jwt.verify(refreshToken, refreshTokenSecret);
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
    }

}

const validateJWT = (req, res, next) => {
    const token = extractBearerToken(req);
    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }
    try {

        const decodedToken = jwt.verify(token, jwtSecret);
        if (!decodedToken) {
            return res.sendStatus(401); // Unauthorized
        }

        req.user = decodedToken;
        next();
    } catch (error) {
        console.log(error);
    }

}


const validateResetJWT = (token) => {
    const resetToken = token;
    if (!resetToken) {
        return res.sendStatus(401); // Unauthorized
    }
    try {

        const decodedToken = jwt.verify(resetToken, resetJwt);
        if (!decodedToken) {
            return res.sendStatus(401); // Unauthorized
        }

        return decodedToken;
    } catch (error) {
        console.log(error);
    }

}


const extractBearerToken = (req) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return null;
    }

    // The Authorization header should be in the format: "Bearer <token>"
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return null;
    }

    return parts[1];
};

module.exports = { generateJwt, generateRefreshJwt, verifyRefreshToken, validateJWT, generateResetJwt, validateResetJWT }