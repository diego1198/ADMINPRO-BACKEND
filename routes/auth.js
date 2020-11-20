//path: api/login
const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT } = require('../middleware/validate-jwt');

const router = Router();

const { login, loginGoogle, renewJWT } = require('../controllers/auth.controller');
const { validateFields } = require('../middleware/validate-fields');


router.post('/',
    [
        check('email','Email is invalid').isEmail(),
        check('password','Password is required').not().isEmpty(),
        validateFields
    ],
    login
)

router.post('/google',
    [
        check('token','Token is required').not().isEmpty(),
        validateFields
    ],
    loginGoogle
)

router.get('/renew',
    validateJWT,
    renewJWT
)

module.exports = router;