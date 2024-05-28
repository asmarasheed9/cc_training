const {fetchUserByORCondition} = require('../../service/user');
const {fetchUserByCondition} = require('../../service/user');

const {sendResponse} = require('../../helpers/response');

const bcrypt = require('bcrypt');

exports.validateUserEmailExist = async (req, res, next) => {
    const {email} = req.body;
    if (!email) {
        return sendResponse.onErrorResp(req, res, 'NO Email is provided', 400);
    }

    const user = await fetchUserByCondition({email});

    if (user) {
        return sendResponse.onErrorResp(req, res, 'User Email Already Exists', 400);
    }

    next();
};

exports.validateUserEmailOrRoleExist = async (req, res, next) => {
    const {email} = req.body;
    const roleId = req.roleId;
    if (!email || !roleId) {
        return sendResponse.onErrorResp(req, res, 'No email OR roleId provided!', 400);
    }
    const user = await fetchUserByORCondition([{email}, {roleId}]);
    if (user) {
        return sendResponse.onErrorResp(req, res, 'User with this Role Already Exists', 400);
    }
    next();
};

exports.validateUserExist = async (req, res, next) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return sendResponse.onErrorResp(req, res, 'NO Email OR password is provided', 400);
    }

    const user = await fetchUserByCondition({email});

    let isCorrectPassword = false;
    if (user) {
        isCorrectPassword = await bcrypt.compare(password, user.password);
    }
    if (!user || !isCorrectPassword) {
        return sendResponse.onErrorResp(req, res, 'Invalid email or password', 400);
    }

    req.loginUser = user.toJSON();
    next();

}

exports.validateUserId = async (req, res, next) => {
    const {userId} = req.body;

    if (!userId) {
        return sendResponse.onErrorResp(req, res, 'No user ID provided', 400);
    }

    const user = await fetchUserByCondition({user_id: userId});

    if (!user) {
        return sendResponse.onErrorResp(req, res, 'userId not exist in db', 400);
    }

    next();

}
