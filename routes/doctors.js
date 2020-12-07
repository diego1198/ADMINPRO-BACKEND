const {Router} = require('express');
const { check } = require('express-validator');

const { validateJWT } = require('../middleware/validate-jwt');
const { validateFields } = require('../middleware/validate-fields');

const {  createDoctor, updateDoctor, deleteDoctor, getDoctors, getDoctorById } = require('../controllers/doctors.controller')

const router = Router();

router.get('/',getDoctors);

router.get('/:uid',validateJWT,getDoctorById);

router.post('/', 
    [
        validateJWT,
        check('name','Doctor name is required').not().isEmpty(),
        check('hospital','Hospital id is invalid').isMongoId(),
        validateFields
    ],
    createDoctor
);

router.put('/:uid',
[
    validateJWT,
    check('name','Name is required').not().isEmpty(),
    check('hospital', 'Hospital Id is required').not().isEmpty(),
    validateFields
],
updateDoctor);

router.delete('/:uid' ,deleteDoctor);

module.exports = router;