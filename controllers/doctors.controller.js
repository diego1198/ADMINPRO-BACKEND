const {response} = require('express');
const Doctor = require('../models/doctor.model');


const getDoctors = async (req,res)=>{

    
    try {

        const doctors = await Doctor.find({},"name hospital").populate('hospital','name')
                                                            .populate('user','name img');

        res.json({
            ok:true,
            doctors
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            error
        })
    }
    
}

const createDoctor = (req,res) =>{

    const uid = req.uid;

    const doctor = new Doctor({...req.body,user:uid});

    try {
        
        doctor.save();

        res.json({
            ok:true,
            doctor
        })
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:"Something was wrong"
        })
    }


}

const updateDoctor = async (req,res) =>{
    
    const id = req.params.uid;

    const uid = req.uid;

    const doctor = Doctor.findById(id);

    if(!doctor){
        res.status(404).json({
            ok:false,
            msg:"Doctor not found"
        })
    }

    const updatedDoctor = {
        ...req.body,
        user: uid
    }

    try {
        
        const doctorUpdate = await Doctor.findByIdAndUpdate(id, updatedDoctor,{new:true})

        res.json({
            ok:true,
            doctor: doctorUpdate
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg: "Something was wrong"
        })
    }
}


const deleteDoctor = async(req,res) =>{

    const id = req.params.uid;

    const uid = req.uid;

    const doctor = Doctor.findById(id);

    if(!doctor){
        res.status(404).json({
            ok:false,
            msg:"Doctor not found"
        })
    }

    try {
        
        await Doctor.findByIdAndDelete(id);

        res.json({
            ok:true,
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg: "Something was wrong"
        })
    }
    
}

module.exports = {
    getDoctors,
    updateDoctor,
    createDoctor,
    deleteDoctor
}