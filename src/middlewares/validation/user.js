const {
    registerUserSchema,
    loginSchema
} = require('../../validations/user');

const { sendResponse } = require('../../helpers/response');

const {validateToken} = require('../../helpers/token');

const validateRegisterUserData = (async (req, resp, next) => {
    registerUserSchema.validate(req.body).then(() => {
        next();
    }).catch((err) => {
        return sendResponse.onErrorResp(req, resp, err.message, 400);
    });
});

const validateUserLoginData = (async (req, res, next) => {
    loginSchema.validate(req.body).then(() => {
        next();
    }).catch((err) => {
        return sendResponse.onErrorResp(req, res, err.message, 400);
    });

});

const validateUserToken = (async (req, res, next) => {
    const headers = req.headers;
    if (!headers || !headers.authorization) {
        return sendResponse.onErrorResp(req, res, 'Authorization Token not exist in headers' , 404);
    }

    const token = await validateToken(headers.authorization.split('Bearer ')[1]);
    if (!token) {
        return sendResponse.onErrorResp(req, res, 'InCorrect token in headers ', 404);
    }
    next();


});

module.exports = {
    validateRegisterUserData,
    validateUserLoginData,
    validateUserToken
}
