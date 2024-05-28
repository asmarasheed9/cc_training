const express = require('express');

const router = express.Router();

const {
    validateRegisterUserData,
    validateUserLoginData
} = require('../../middlewares/validation/user')

const {
    registerUser
} = require('../../controllers/authentication')


const {validateUserEmailOrRoleExist, validateUserEmailExist, validateUserExist} = require('../../middlewares/api/user');
const {getAndSetRoleIdByName, setUserRoleByName} = require('../../middlewares/api/role');

router.post('/register', validateRegisterUserData, validateUserEmailExist, getAndSetRoleIdByName, validateUserEmailOrRoleExist, registerUser);

router.post('/login', validateUserLoginData, validateUserExist, setUserRoleByName);


module.exports = router;