const DB_CREDENTIALS = Object.freeze({
    DB_HOST: 'localhost',
    DB_PORT: '3306',
    DB_DIALECT: 'mysql',
    DB_USER: 'root',
    DB_NAME: 'technosoft_sample',
    DB_PASSWORD: 'Ts123456!'
});

const TOKEN = Object.freeze({
    EXPIRY_LIMIT: '6h',
    TOKEN_KEY: 'ebaca5b76d36d18a45c02904feea278a6894827d46a26c7a26892a5f34ef84c53106ac3eabaa86f44da2dc18916674fe211d12fe772049825b8804ea3bfa7624'
});
// const crypto = require('crypto');
//     console.log(crypto.randomBytes(64).toString('hex'));

module.exports = {
    DB_CREDENTIALS,
    TOKEN
}
