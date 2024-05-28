const token = require('jsonwebtoken');
const {TOKEN} = require('../util/constant');


exports.createToken = (user) => {
    return token.sign({user}, TOKEN.TOKEN_KEY, {expiresIn: TOKEN.EXPIRY_LIMIT});
}

exports.validateToken = (userToken) => {
    try {
        return token.verify(userToken, TOKEN.TOKEN_KEY);
    } catch (e) {
        return false;
    }
}
