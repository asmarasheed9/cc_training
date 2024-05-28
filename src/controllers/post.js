const {sendResponse} = require('../helpers/response');
const {createPost, getPostConditionally} = require('../service/post');
const db = require('../models/index');
const sequelize = require('sequelize');

const createPostItem = (async (req, res, next) => {
    const post = await createPost({message: req.body.message, userId: parseInt(req.body.userId, 10)});

    if (!post) {
        return sendResponse.onErrorResp(req, res, 'Error on post creation', 404);
    }
    return sendResponse.withData(req, res, post, 200);
});

const getAllPosts = (async (req, res, next) => {
    const posts = await getPostConditionally();
    if (!posts) {
        return sendResponse.onErrorResp(req, res, 'Error on fetching all posts ', 404);
    }

    return sendResponse.withData(req, res, posts, 200);
});


const getAllPostWithUserDetails = (async (req, res, next) => {
    const posts = await getPostConditionally(undefined, {
        include: [[sequelize.col('User.email'), 'Email']],
        exclude: ['createdAt', 'updatedAt', 'deletedAt', 'userId']
    }, [
        {
            model: db.User,
            attributes: [[sequelize.col('user_id'), 'UserId']],
            include: [
                {
                    model: db.Role,
                    attributes: ['name']
                }
            ]
        }
    ]);
    if (!posts) {
        return sendResponse.onErrorResp(req, res, 'Error on fetching all posts ', 404);
    }

    return sendResponse.withData(req, res, posts, 200);
});

module.exports = {
    createPostItem,
    getAllPosts,
    getAllPostWithUserDetails
};