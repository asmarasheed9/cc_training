const db = require('../models/index');

exports.createPost = async (body) => {
    console.log('create post body ', body);
    return db.Post.create(body);
}

exports.getPostConditionally = async(whereOptions, attributes, include) => {
    return db.Post.findAll({
        where: whereOptions,
        attributes,
        include
    })
}

exports.getSinglePostConditionally = async(whereOptions, attributes, include) => {
    return db.Post.findOne({
        where: whereOptions,
        attributes,
        include
    })
}