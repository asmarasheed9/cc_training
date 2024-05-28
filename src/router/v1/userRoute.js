const express = require('express');

const router = express.Router();

const {getAllUsersList, getUser} = require('../../controllers/user');
const {isUserRoleAdmin} = require('../../middlewares/api/role');

router.get('/all', isUserRoleAdmin, getAllUsersList);
router.get('/:userId', isUserRoleAdmin, getUser);

module.exports = router;
