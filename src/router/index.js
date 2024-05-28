const express = require('express');

const authRoutes = require('./v1/authenticateRoute');
const userRoutes = require('./v1/userRoute');
const roleRoutes = require('./v1/roleRoute');
const postRoutes = require('./v1/postRoute');

const {validateUserToken} = require('../middlewares/validation/user');
const {isUserRoleAdmin} = require('../middlewares/api/role');
const {validateUserId} = require('../middlewares/api/user');

const router = express.Router();

router.use('/authentication', authRoutes);

router.use('/users', validateUserToken , userRoutes);
router.use('/roles', validateUserToken, isUserRoleAdmin , roleRoutes);

router.use('/post', validateUserToken, validateUserId, postRoutes);

module.exports = router;
