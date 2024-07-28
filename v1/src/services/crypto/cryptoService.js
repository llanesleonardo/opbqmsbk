require('dotenv').config();
const forge = require('node-forge');

const decryptText = (encryptedText, privateKey) => {
    // context.log('privateKey', privateKey);
    const privateKeyForge = forge.pki.privateKeyFromPem(privateKey);
    // context.log('encryptedText', encryptedText);
    const encrypted = forge.util.decode64(encryptedText);
    //  context.log('encrypted', encrypted);
    const decrypted = privateKeyForge.decrypt(encrypted, 'RSA-OAEP');
    // context.log('decrypted', decrypted);
    return decrypted;
};


module.exports = { decryptText };