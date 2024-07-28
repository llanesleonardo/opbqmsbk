const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
//const { validateJWT } = require('../services/auth/index');
const {
    getUsers,
    getUser,
    getMe,
    patchMe,
    registerNewUser,
    postNewUser,
    patchUser,
    deleteUser,
    logInUser,
    logOutUser,
    changeUserPassword,
    forgotUserPassword,
    resetPassword
} = require('../controllers/UserController');


// User Profile
router.get('/me', getMe);
router.patch('/me', patchMe);
router.post('/changepassword', changeUserPassword);


// Authentication endpoints
router.post('/register', registerNewUser);
router.post('/login', logInUser);
router.post('/logout', logOutUser);

// Password Recovery
router.post('/forgotpassword', forgotUserPassword);
router.post('/resetpassword', resetPassword);

// Admin ops
router.get('/', getUsers);
router.post('/', postNewUser);
router.get('/:id', getUser);
router.patch('/:id', patchUser);
router.delete('/:id', deleteUser);


module.exports = router;