const { response } = require('express');
const Hospital = require('../models/hospital.model');

const getHospitals = async (req, res = response) => {

    const offset = Number(req.query.offset) || 0;

    const limit = Number(req.query.limit) || 0;

    const [hospitals, total] = await Promise.all([
        Hospital.find().populate('user', 'name img').skip(offset)
            .limit(limit),
        Hospital.countDocuments()
    ]);
    res.json({
        ok: true,
        hospitals,
        total
    })
}

const createHospital = async (req, res = response) => {

    const uid = req.uid;

    const hospital = new Hospital({ ...req.body, user: uid });

    try {

        await hospital.save()


        res.json({
            ok: true,
            hospital
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Something was wrong"
        })
    }
}

const updateHospital = async (req, res = response) => {

    const id = req.params.uid;

    const uid = req.uid;

    const hospital = await Hospital.findById(id);

    if (!hospital) {
        return res.status(404).json({
            ok: false,
            msg: "Hospital not found"
        })
    }

    const changeHospital = {
        ...req.body,
        user: uid
    }

    const hospitalUpdate = await Hospital.findByIdAndUpdate(id, changeHospital, { new: true });

    try {

        res.json({
            ok: true,
            hospitalUpdate
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Something was wrong"
        })
    }

}


const deleteHospital = async (req, res = response) => {

    const id = req.params.uid;

    const hospital = await Hospital.findById(id);

    if (!hospital) {
        return res.status(404).json({
            ok: false,
            msg: "Hospital not found"
        })
    }

    await Hospital.findByIdAndDelete(id);

    try {

        res.json({
            ok: true
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Something was wrong"
        })
    }


}

module.exports = {
    getHospitals,
    updateHospital,
    createHospital,
    deleteHospital
}