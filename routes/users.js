const {Router} = require('express');
const { check } = require('express-validator');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users');
const { validateJWT } = require('../middleware/validate-jwt');
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
    check('name','Name is required').not().isEmpty(),
    check('role','Role is required').not().isEmpty(),
    check('email','Email is not valid').isEmail(),
    validateFields
],
updateUser);

router.delete('/:uid', validateJWT ,deleteUser);

module.exports = router;