const fs = require('fs');

const User = require('../models/users.model');
const Hospital = require('../models/hospital.model');
const Doctor = require('../models/doctor.model');

const deleteImage = (path) => {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
}

const updateImage = async (nameFile, uid, collection) => {

    let oldPath;

    switch (collection) {
        case 'doctors':
            const doctor = await Doctor.findById(uid);
            if (!doctor) {
                return false;
            }
            oldPath = `./uploads/doctors/${doctor.img}`;

            deleteImage(oldPath)

            doctor.img = nameFile;

            await doctor.save();

            return true;

            break;
        case 'hospitals':
            const hospital = await Hospital.findById(uid);
            if (!hospital) {
                return false;
            }
            oldPath = `./uploads/hospitals/${hospital.img}`;

            deleteImage(oldPath)

            hospital.img = nameFile;

            await hospital.save();

            return true;

            break;
            break;
        case 'users':
            const user = await User.findById(uid);
            if (!user) {
                return false;
            }
            oldPath = `./uploads/users/${user.img}`;

            deleteImage(oldPath);

            user.img = nameFile;

            await user.save();

            return true;
            break;

    }
}

module.exports = {
    updateImage
}