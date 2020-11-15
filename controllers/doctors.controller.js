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

const updateDoctor = (req,res) =>{
    
}


const deleteDoctor = (req,res) =>{
    
}

module.exports = {
    getDoctors,
    updateDoctor,
    createDoctor,
    deleteDoctor
}