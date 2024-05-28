const {sendResponse} = require('../../helpers/response');

const {getSinglePostConditionally} = require('../../service/post')

exports.isUserOwner = async (req, res, next) => {

    const post = await getSinglePostConditionally({post_id: req.params.postId});
    if (!post) {
        return sendResponse.onErrorResp(req, res, 'No post with this PostId Exist ', 404);
    }
    sendResponse.withData(req, res, post, 200);

}