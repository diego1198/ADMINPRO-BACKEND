const {response} = require('express');
const Hospital = require('../models/hospital.model');

const getHospitals = async (req,res)=>{

    const hospital = await Hospital.find().populate('user','name img');

    res.json({
        ok:true,
        hospital
    })
}

const createHospital = async (req,res) =>{

    const uid = req.uid;

    const hospital = new Hospital({...req.body,user:uid});
    
    try {

        await hospital.save()
    

        res.json({
            ok:true,
            hospital
        })
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:"Something was wrong"
        })
    }
}

const updateHospital = (req,res) =>{

   
}


const deleteHospital = (req,res) =>{
    
}

module.exports = {
    getHospitals,
    updateHospital,
    createHospital,
    deleteHospital
}