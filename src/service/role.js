const {Op} = require('sequelize');
const db = require('../models/index');


exports.getRoleByCondition = async (whereOption, attributes) => {
    return await db.Role.findOne({
        where: whereOption,
        attributes
    });
};

exports.getAllRoleByCondition = async (whereOption, attributes, include) => {
    return await db.Role.findAll({
        where: whereOption,
        attributes,
        include
    });
}