const  {fetchAllUsers, fetchUserByCondition} = require('../service/user');
const {sendResponse} = require('../helpers/response');
const db = require('../models/index');
const sequelize = require('sequelize')

const getAllUsersList = (async (req, res, next) => {
    const resp = await fetchAllUsers(undefined,{
        include: [
            [sequelize.col('Role.name'), 'roleName']
        ]
    }, [{
        model: db.Role,
        attributes: []
    }
    ]);
    return sendResponse.withData(req, res, {users: resp}, 200);
});

const getUser = (async (req, res, next) => {
    const user_id = req.params.userId;

    if (!user_id) {
        return sendResponse(req, res, 'No UserId provided in params ', 400);
    }

    const user = await fetchUserByCondition({user_id: req.params.userId},
        {
            include: [
                [sequelize.col('Role.name'), 'roleName']
            ],
            exclude: [
                'updatedAt', 'deletedAt', 'createdAt', 'password', 'roleId'
            ]
        },
        [
            {
                model: db.Role,
                attributes: []
            }
        ]);
    if (!user) {
        return sendResponse.onErrorResp(req, res, 'User with this Id not exist', 404);
    }
    return sendResponse.withoutData(req, res, user, 200);
});


module.exports = {
    getAllUsersList,
    getUser
}