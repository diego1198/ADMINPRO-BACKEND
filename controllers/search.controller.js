const { response } = require("express");

const User = require('../models/users.model');
const Hospital = require('../models/hospital.model');
const Doctor = require('../models/doctor.model');

const searchParam = async (req, res = response) => {

    const param = req.params.param;
    const regexp = new RegExp(param, 'i');

    const [users, hospitals, doctors] = await Promise.all([
        User.find({ name: regexp }),
        Hospital.find({ name: regexp }),
        Doctor.find({ name: regexp }),

    ]);

    res.json({
        ok: true,
        users,
        hospitals,
        doctors
    })
}

const searchCollection = async (req, res = response) => {

    const { document, param } = req.params;

    const regexp = new RegExp(param, 'i');

    let data = [];

    try {
        switch (document) {
            case 'doctors':
                data = await Doctor.find({ name: regexp });
                break;
            case 'hospitals':
                data = await Hospital.find({ name: regexp });
                break;
            case 'users':
                data = await User.find({ name: regexp });
                break;

            default:
                res.status(400).json({
                    ok: false,
                    msg: "Uknown collection"
                })
                break;
        }

        res.json({
            ok: true,
            result: data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Something was wrong"
        })
    }


}

module.exports = {
    searchParam,
    searchCollection
}