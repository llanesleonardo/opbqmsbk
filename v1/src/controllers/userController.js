const bcrypt = require("bcrypt");
const { generateJwt, generateRefreshJwt, generateResetJwt, validateResetJWT } = require('../services/auth/jwtStrategy');
const { users, refreshTokens } = require('../database/models/predefinedArrayUserModel');
const {
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
} = require('../database/repositories/userRepository');
const { ClientSecretCredential } = require('@azure/identity');
const { Client } = require('@microsoft/microsoft-graph-client');
require('dotenv').config();



const getUsers = (req, res) => {
    const users = getUsersURepo();
    res.json(users);
};

const getUser = (req, res) => {
    const { id } = req.params;
    const user = getUserURepo(id);

    if (!user) {
        res.status(400).json({ msg: 'No user was found.' });
    }

    res.json(user);
};

const getMe = (req, res) => {
    //const user = getMeURepo(req.user.id);
    const user = getMeURepo('1');
    if (!user) {
        res.status(400).json({ msg: 'No user was found.' });
    }

    res.json(user);
};

const patchMe = (req, res) => {
    try {
        //const userId = req.user.id;
        const updatedData = req.body;

        // Find the user in the array by ID and update the data
        //const userIndex = getMeIndexURepo(userId);
        const userIndex = getMeIndexURepo('1');
        if (userIndex !== -1) {
            const userUpdated = patchMeURepo(userIndex, users, updatedData);
            res.json({ message: 'User updated successfully', user: userUpdated });
        } else {
            res.status(404).json({ message: 'User not found' });
        }

    } catch (error) {
        res.status(500).json({error});
    }
};

const registerNewUser = async (req, res) => {

    try {
        const newUser = await registerNewUserURepo(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json('error', error);
    }

};

const postNewUser = async (req, res) => {

    try {
        const newUser = registerNewUserURepo(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json('error', error);
    }

};

const patchUser = async (req, res) => {

    try {

        const userId = req.params.id;
        const updatedData = req.body;
        // Find the user in the array by ID and update the data
        const userIndex = getUserIndexURepo(userId);
        if (userIndex !== -1) {
            const userUpdated = patchUserURepo(userIndex, updatedData);
            res.json({ message: 'User updated successfully', user: userUpdated });

        } else {
            res.status(404).json({ message: 'User not found' });
        }

    } catch (error) {
        res.status(500).json(error);
    }

};

const deleteUser = async (req, res) => {

    try {
        const userId = req.params.id;
        const userDeleted = deleteUserUrepo(userId);
        if (!userDeleted[0]) {
            res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully', userId });

    } catch (error) {
        res.status(500).json(error);
    }

}

const logInUser = async (req, res) => {
    /*
         res.cookie('jwt', token, { httpOnly: true, secure: true, sameSite: "strict" });
         res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: "strict" });
    
     */

    try {
        const { id, email, password } = req.body;

        const user = getUserURepoAdminLocaleURepo(email);
        if (user === null) {
            return res.status(400).send(`User: ${id} not found.`);
        }

        if (await bcrypt.compare(password, user.password)) {
            //set access token
            const accessToken = generateJwt(user);
            user.token = accessToken;

            // set refreshToken
            const accessRefreshToken = generateRefreshJwt(user);
            const userUpdated = setRefreshTokenToUserURepo(user, accessRefreshToken);

            const isCookieSet = setCookieUserURepo(res, userUpdated);

            res.status(200).json({ userUpdated, refreshTokens, isCookieSet: `${isCookieSet}` });
        } else {
            res.send("Access denied.");
        }

    } catch (error) {
        console.log(error);
    }

};


const logOutUser = (req, res) => {

    try {
        const { id } = req.body;
        const user = getUserURepo(id);

        if (user === null) {
            return res.status(400).send(`User: ${id} not found.`);
        } else {
            const refreshTokenIndex = getRefreshTokenIndexURepo(user);
            if (refreshTokenIndex !== -1) {
                const unsetRefreshToken = unSetRefreshTokenToUserURepo
                    (refreshTokenIndex, user);

                const unSetCookie = unSetCookieUserURepo(res);

                res.json({ message: ' Refresh Token deleted successfully', user, unsetRefreshToken, unSetCookie });

            } else {
                res.status(404).json({ message: 'User not found' });
            }
        }


    } catch (error) {
        console.log(error);
    }

};


const changeUserPassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        //const { id } = req.user;
        const user = getUserURepo('5');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the old password with the stored hash
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Old password is incorrect' });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        // Find the user in the array by ID and update the data
        const userIndex = getUserIndexURepo(user.id);


        if (userIndex !== -1) {
            const userPatched = patchUserPasswordURepo(userIndex, hashedPassword);
            res.json({ message: 'User updated successfully', user: userPatched, oldPassword: oldPassword, newPassword: newPassword });
        }

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });

    }

};

const forgotUserPassword = async (req, res) => {
    //send email

    const { email } = req.body;
    try {

        const user = getUserByEmailURepo(email);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a reset token
        const resetToken = generateResetJwt({ id: user.id });

        // Create a reset URL
        const resetUrl = `http://specialcarbide.com/reset-password?token=${resetToken}`;


        const credential = new ClientSecretCredential(process.env.tenantId, process.env.clientId, process.env.CLIENT_SECRET);

        // Create a Microsoft Graph client
        const graphClient = Client.initWithMiddleware({
            authProvider: {
                getAccessToken: async () => {
                    try {
                        // Get access token using the token credential
                        const token = await credential.getToken('https://graph.microsoft.com/.default');
                        // Pass the access token to the next middleware
                        return token.token;
                    } catch (error) {
                        // Pass any errors to the next middleware
                        throw error;
                    }
                }
            }
        });


        // Define the email message
        const emailMessage = {
            subject: 'Forgot Password Email',
            toRecipients: [{
                emailAddress: {
                    address: email,
                }
            }],
            body: {
                contentType: 'html',
                content: `
                       <html>
                       <head>
                         <style>
                           body {
                             font-family: Arial, sans-serif;
                           }
                         </style>
                       </head>
                       <body>
                         <p>${resetUrl}</p>
                         </body>
                       </html>
                     `
            }
        };

        // Send the email
        graphClient.api('/users/c8251567-b296-493a-8397-22bbdcb92407/sendMail')
            .post({ message: emailMessage })
            .then(() => console.log('Forgot Password Email sent successfully'))
            .catch((error) => console.error('Something wrong just happened. There was an error sending the email.', error));


        res.status(200).json({ message: 'Password reset link sent to your email', token: resetToken });



    } catch (error) {
        res.status(500).json({ message: 'Server error', error });

    }

};

const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    const decodedUser = validateResetJWT(token);
    // Hash the new password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password in the database
    decodedUser.password = hashedPassword;
    // Find the user in the array by ID and update the data
    // Find the user in the array by ID and update the data
    const userIndex = getUserIndexURepo(decodedUser.id);


    if (userIndex !== -1) {
        const userPatched = patchUserPasswordURepo(userIndex, hashedPassword);
        res.json({ message: 'User updated successfully', user: users[userIndex], newPassword: newPassword });
    }

};

module.exports = { getUsers, getUser, getMe, patchMe, registerNewUser, postNewUser, patchUser, deleteUser, logInUser, logOutUser, changeUserPassword,forgotUserPassword ,resetPassword};