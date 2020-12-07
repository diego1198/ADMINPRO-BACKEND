const {Router} = require('express');
const { check } = require('express-validator');

const { validateJWT } = require('../middleware/validate-jwt');
const { validateFields } = require('../middleware/validate-fields');

const { createHospital, getHospitals, deleteHospital, updateHospital } = require('../controllers/hospitals.controller')

const router = Router();

router.get('/',validateJWT,getHospitals);

router.post('/', 
    [
        validateJWT,
        check('name','The Hospital name is required').not().isEmpty(),
        validateFields
    ],
    createHospital
);

router.put('/:uid',
[
    validateJWT,
    check('name',"Name is required").not().isEmpty(),
    validateFields
],
updateHospital);

router.delete('/:uid' ,
[
    validateJWT,
],
deleteHospital);

module.exports = router;