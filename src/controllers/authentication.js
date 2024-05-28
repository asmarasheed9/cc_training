const {createUser} = require('../service/user');

const {createToken} = require('../helpers/token');

const {sendResponse} = require('../helpers/response');

const registerUser = async (req, res) => {

    const body = req.body;
    const roleId = req.roleId;
    body.roleId = roleId;

    const user = await createUser(body);

    const token = createToken(body);

    console.log('TOKEN ', token);

    return sendResponse.withData(req, res, token, 200);

};


module.exports = {
    registerUser
}