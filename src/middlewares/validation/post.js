const {postSchema} = require('../../validations/post');
const {sendResponse} = require('../../helpers/response')


const validatePostSchema = (async (req, res, next) => {
    postSchema.validate(req.body).then(() => {
        next();
    }).catch((err => {
        return sendResponse.onErrorResp(req, res, err.message, 400);
    }));
});

module.exports = {
    validatePostSchema
}