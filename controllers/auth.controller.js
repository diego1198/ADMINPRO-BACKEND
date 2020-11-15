const { response, json } = require('express');

const User = require('../models/users.model');

const bcrypt = require('bcryptjs');

const { generateJWT } = require('../helpers/jwt')

const login = async(req,res=response) =>{

    const { email, password } = req.body;

    try {

        const userDB = await User.findOne({email});

        if(!userDB){
            res.status(404).json({
                ok: false,
                msg: "Email not found"
            })
        }

        const validPassword = await bcrypt.compare(password,userDB.password);

        if(!validPassword){
            res.json({
                ok: false,
                msg: "Incorrect Password"
            })  
        }

        const token = await generateJWT(userDB.id);


        res.json({
            ok: true,
            msg: "Login success",
            token
        })
        
        
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Something was wrong"
        })
    }
}

module.exports = {
    login
}