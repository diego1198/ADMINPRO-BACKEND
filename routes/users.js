const {Router} = require('express');
const { check } = require('express-validator');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users.controller');
const { validateJWT, validateRole, validateRoleOrSameUser } = require('../middleware/validate-jwt');
const { validateFields } = require('../middleware/validate-fields');

const router = Router();

router.get('/', validateJWT ,getUsers);

router.post('/', 
    [
        check('name','Name is require').not().isEmpty(),
        check('password','Password is require').not().isEmpty(),
        check('email','Email is not valid').isEmail(),
        validateFields
    ],
    createUser
);

router.put('/:uid',
[
    validateJWT,
    validateRoleOrSameUser,
    check('name','Name is required').not().isEmpty(),
    check('role','Role is required').not().isEmpty(),
    check('email','Email is not valid').isEmail(),
    validateFields
],
updateUser);

router.delete('/:uid', [validateJWT,validateRole ],deleteUser);

module.exports = router;