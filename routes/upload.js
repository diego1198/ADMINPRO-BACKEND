const {Router} = require('express');
const fileUpload = require('express-fileupload');

const { uploadFile, getFile } = require('../controllers/upload.controller');
const { validateJWT } = require('../middleware/validate-jwt');

const router = Router();

router.use( fileUpload() );

router.put('/save/:collection/:uid', validateJWT ,uploadFile);

router.get('/get/:collection/:id',getFile);

module.exports = router;

