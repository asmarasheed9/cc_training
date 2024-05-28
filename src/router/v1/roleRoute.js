const express = require('express');


const router = express.Router();

const {getAllAppRoles, getRoleInfo} = require('../../controllers/role');

router.get('/all', getAllAppRoles);
router.get('/:roleName', getRoleInfo);


module.exports = router;