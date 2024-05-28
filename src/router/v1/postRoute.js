const express = require('express');

const router = express.Router();

const {validatePostSchema} = require('../../middlewares/validation/post');
const {createPostItem, getAllPosts, getAllPostWithUserDetails} = require('../../controllers/post');

const {isUserOwner} = require('../../middlewares/api/post')

router.post('/create', validatePostSchema, createPostItem);

router.get('/all', getAllPosts);

router.get('/userDetails', getAllPostWithUserDetails);

router.put('/:postId', isUserOwner)

module.exports = router;