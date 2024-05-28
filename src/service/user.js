
const {Op} = require('sequelize');
const db = require('../models/index');

exports.createUser = async (body) => {
    console.log('user create ', body);
    return db.User.create(body);
}

exports.fetchUserByCondition = async (whereCondition, attributes, include) => {
    return await db.User.findOne({
        where: whereCondition,
        attributes,
        include
    });
}

exports.fetchUserByORCondition = async (whereCondition) => {
    return await db.User.findOne({
        where: {
            [Op.or]: whereCondition
        }
    });
}

exports.fetchAllUsers = async (whereOptions, attributes, include) => {
    return await db.User.findAll({
        where: whereOptions,
        attributes,
        include
    });
}
