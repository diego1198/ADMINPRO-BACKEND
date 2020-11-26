const { response } = require("express")

const path = require('path');

const fs = require('fs');


const { v4: uuidv4 } = require('uuid');

const { updateImage } = require('../helpers/updateImage');

const uploadFile = async (req, res = response) => {

    const collection = req.params.collection;

    const uid = req.params.uid;

    const validCollections = ['hospitals', 'users', 'doctors']

    if (!validCollections.includes(collection)) {
        return res.status(400).json({
            ok: false,
            msg: "Invalid collection"
        })
    }

    //Validate that file exists
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: "Not file in post"
        });
    }

    //TODO:Process the image

    const file = req.files.file;

    const splitName = file.name.split('.');
    const extension = splitName[splitName.length - 1];

    //Validar extension

    const validExtension = ['png', 'jpg', 'jpeg', 'gif'];

    if (!validExtension.includes(extension)) {
        return res.status(400).json({
            ok: false,
            msg: "Invalid extension"
        })
    }


    //Nombre archivo
    const nameFile = `${uuidv4()}.${extension}`;

    //Path 

    const path = `./uploads/${collection}/${nameFile}`;

    file.mv(path, (err) => {
        if (err) {
            res.status(400).json({
                ok: true,
                msg: err
            })
        }

    });

    updateImage(nameFile, uid, collection);


    res.json({
        ok: true,
        name: nameFile,

    })





}

const getFile = async (req, res = response) => {
    const collection = req.params.collection;

    const id = req.params.id;

    const validCollections = ['hospitals', 'users', 'doctors']

    if (!validCollections.includes(collection)) {
        return res.status(400).json({
            ok: false,
            msg: "Invalid collection"
        })
    }

    let pathFile = path.resolve( __dirname , `../uploads/${collection}/${id}`)

    //default Image

    if (fs.existsSync(pathFile)) {
        res.sendFile(pathFile);
    } else {
        pathFile = path.resolve(__dirname, `../uploads/no-img.png`);
        res.sendFile(pathFile);
    }


}

module.exports = {
    uploadFile,
    getFile
}