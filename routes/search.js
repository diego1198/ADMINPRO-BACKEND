/* 
    Ruta : api/all
*/

const {Router} = require('express');
const { check } = require('express-validator');

const { validateJWT } = require('../middleware/validate-jwt');

const { searchParam, searchCollection } = require('../controllers/search.controller');

const router = Router();

router.get('/:param', validateJWT ,searchParam);

router.get('/collection/:document/:param', validateJWT ,searchCollection);

module.exports = router;
