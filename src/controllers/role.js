const express = require('express');

const {getAllRoleByCondition} = require('../service/role');

const {sendResponse} = require('../helpers/response');

const db = require('../models/index');
const sequelize = require('sequelize');

const getAllAppRoles = (async (req, res, next) => {
    const roles = await getAllRoleByCondition(undefined, {
            include: [[sequelize.col('User.email'), 'UserEmail']],
            exclude: ['updatedAt', 'deletedAt', 'createdAt', 'user_id'],

        },
        [
            {
                model: db.User,
                attributes: []
            }
        ]
    );
//TODO in case of db error o role not exist
    return sendResponse.withData(req, res, roles, 200);

});

const getRoleInfo = (async (req, res, next) => {
    console.log('req ', req.params);
    if (!req.params || !req.params.roleName) {
        sendResponse.onErrorResp(req, res, 'RoleName not exist in params', 404);
    }

    const role = await getAllRoleByCondition({name: req.params.roleName},
        {
            exclude: ['updatedAt', 'deletedAt', 'createdAt'],
            include: [
                [sequelize.col('User.email'), 'User Email']
            ]
        },
        [
            {
                model: db.User,
                attributes: []
            }
        ]);

    if (!role || role.length === 0) {
        sendResponse.onErrorResp(req, res, 'No Role with given name exist', 404);
    }

    console.log('role ', role);

    sendResponse.withData(req, res, role, 200);

});

module.exports = {
    getAllAppRoles,
    getRoleInfo
}