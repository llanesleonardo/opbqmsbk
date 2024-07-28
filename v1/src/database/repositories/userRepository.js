let { users, refreshTokens } = require('../models/predefinedArrayUserModel');
const bcrypt = require("bcrypt");


const getUsersURepo = () => {
    return users;
};

const getUserURepo = (id) => {
    return users.find(user => user.id === id);
};

const getUserByEmailURepo = (email) => {
    return users.find(user => user.email === email);
};

const getUserURepoAdminLocaleURepo = (email) => {
    return userAdminLocaleURepo(users.find(user => user.email === email));
};

const userAdminLocaleURepo = (user) => {
    user.role = "admin";
    user.locale = "english";
    return user;
};

const getMeURepo = (id) => {
    return users.find(user => user.id === id);
};

const getMeIndexURepo = (id) => {
    return users.findIndex(user => user.id == id);
};

const patchMeURepo = (index, users, dataToUpdate) => {
    users[index] = { ...users[index], role: dataToUpdate.role };
    return users[index];
};


const registerNewUserURepo = async ({ id, username, password, email }) => {
    const salt = await bcrypt.genSalt();
    const hashedPwd = await bcrypt.hash(password, salt);
    const newUser = { id: id, username: username, password: hashedPwd, email: email, role: '', locale: '' }
    users.push(newUser);
    return newUser;
};

const postNewUserURepo = async ({ id, username, password, email }) => {
    const salt = await bcrypt.genSalt();
    const hashedPwd = await bcrypt.hash(password, salt);
    const newUser = { id: id, username: username, password: hashedPwd, email: email, role: '', locale: '' }
    users.push(newUser);
    return newUser;
};


const getUserIndexURepo = (id) => {
    return users.findIndex(user => user.id == id);
};

const patchUserURepo = (index, dataToUpdate) => {
    users[index] = { ...users[index], role: dataToUpdate.role };
    return users[index];
};

const patchUserPasswordURepo = (index, newPassword) => {
    users[index] = { ...users[index], password: newPassword };
    return users[index];
};

const deleteUserUrepo = (id) => {
    // Find the user in the array by ID and update the data
    const userIndex = users.findIndex(user => user.id == id);
    if (userIndex !== -1) {
        return users.splice(userIndex, 1);
    } else {
        return null;
    }
};



const setRefreshTokenToUserURepo = (user, refreshtoken) => {

    refreshTokens.push(
        {
            "id": user.id,
            "userId": user.id,
            "refreshtoken": refreshtoken,
            "status": 1
        });
    user.refreshToken = refreshtoken;
    return user;

};

const getRefreshTokenIndexURepo = (user) => {
    return refreshTokens.findIndex(refreshToken => refreshToken.userId === user.id);
};

const unSetRefreshTokenToUserURepo = (refreshTokenIndex, user) => {
    user.refreshToken = '';
    user.token = '';
    return refreshTokens.splice(refreshTokenIndex, 1);
};

const setCookieUserURepo = (res, user) => {
    // Set a cookie
    res.cookie('Token', { "id": user.id, "userId": user.id, "token": user.token });
    res.cookie('refreshToken', { "id": user.id, "userId": user.id, "refreshtoken": user.refreshToken });
    return 'cookie set';
};

const unSetCookieUserURepo = (res) => {
    res.clearCookie('Token');
    res.clearCookie('refreshToken');

    return 'unset cookie';
};



module.exports = {
    getUsersURepo,
    getUserURepo,
    getMeURepo,
    getMeIndexURepo,
    patchMeURepo,
    registerNewUserURepo,
    getUserIndexURepo,
    patchUserURepo,
    patchUserPasswordURepo,
    deleteUserUrepo,
    getUserURepoAdminLocaleURepo,
    setRefreshTokenToUserURepo,
    setCookieUserURepo,
    getRefreshTokenIndexURepo,
    unSetRefreshTokenToUserURepo,
    unSetCookieUserURepo,
    getUserByEmailURepo
};