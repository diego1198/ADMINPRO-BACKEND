//path: api/login
const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

const { login } = require('../controllers/auth.controller');
const { validateFields } = require('../middleware/validate-fields');


router.post('/',
    [
        check('email','Email is invalid').isEmail(),
        check('password','Password is required').not().isEmpty(),
        validateFields
    ],
    login
)

module.exports = router;