const {sendResponse} = require('../../helpers/response');

const {getRoleByCondition} = require('../../service/role');

const {createToken} = require('../../helpers/token');

exports.getAndSetRoleIdByName = async (req, res, next) => {
    const {role} = req.body;
    if (!role) {
        return sendResponse.onErrorResp(req, res, 'NO Role is provided', 400);
    }

    const roleExists = await getRoleByCondition({name: role});

    if (!roleExists) {
        return sendResponse.onErrorResp(req, res, 'Role Not Exist in DB', 404);
    }

    req.roleId = roleExists.id;

    next();
};

exports.isUserRoleAdmin = async (req, res, next) => {
    const {roleId} = req.body;
    if (!roleId) {
        return sendResponse.onErrorResp(req, res, 'No RoleId provide to check authorization', 400);
    }

    const roleExists = await getRoleByCondition({id: roleId}, ['name']);

    if (!roleExists) {
        return sendResponse.onErrorResp(req, res, 'Role Not Exist in DB', 404);
    }

    if (roleExists.name !== 'Admin') {
        return sendResponse.onErrorResp(req, res, 'You are not Authorized for this action', 404);
    }

    next();
}

exports.setUserRoleByName = async (req, res, next) => {
    // TODO in case return user data with role name
    /*const {loginUser} = req;
    console.log('req ', loginUser.roleId);
    const role = await getRoleByCondition({id: loginUser.roleId});

    if (!role) {
        return sendResponse.onErrorResp(req, res, 'Role Saved in Users Not Exist in DB', 404);
    }
    console.log('role ', role.name);
    loginUser.roleName = role.name;
    return sendResponse.withData(req, res, loginUser, 200);*/

    const {loginUser} = req;
    console.log(loginUser);

    const token = createToken(loginUser);
    return sendResponse.withData(req, res, {accessToken: token}, 200);

};