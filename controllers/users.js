const { response, json } = require('express');

const User = require('../models/users');

const bcrypt = require('bcryptjs');

const { generateJWT } = require('../helpers/jwt')


const getUsers = async (req, res) => {
    const users = await User.find({}, 'name email role google');

    res.json({
        ok: true,
        users: users,
        uid: req.uid
    })
};

const createUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const emailExist = await User.findOne({ email });

        if (emailExist) {
            return res.status(400).json({
                ok: false,
                msg: 'Mail already exist'
            })
        }

        const user = new User(req.body);

        //Encrypt password

        const seed = bcrypt.genSaltSync();

        user.password = bcrypt.hashSync(password, seed);

        await user.save();
        
        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            user,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok: false,
            msg: "Something was wrong"
        })
    }



};

const updateUser = async (req, res = response) => {

    const  uid  = req.params.uid;

    try {

        const user = await User.findById(uid);

        if(!user){
            return res.status(400).json({
                ok: false,
                msg: "User with uid does not exist"
            })
        }

        const { password, google, email, ...fields} = req.body;

        if(user.email != email){
         
            const emailExist = await User.findOne( { email } );

            if(emailExist){
                return res.status(400).json({
                    ok:false,
                    msg: "Email already exist"
                })
            }
        }

        fields.email = email;

        //TODO: Verfy with token

        //Its posible to use delete for delete fields of an object
        /* delete fields.password;
        delete fields.google; */

        const userUpdate = await User.findByIdAndUpdate(uid, fields, { new: true});

        res.json({
            ok:true,
            userUpdate
        });



    } catch (error) {
        res.json({
            ok:false,
            msg: "Something was wrong"
        })
    }
}

const deleteUser = async (req, res = response) =>{
    const  uid = req.params.uid;

    try {
        const userDB = await User.findById(uid);
        
        if(!userDB){
            return res.status(400).json({
                ok: false,
                msg: "User does not exist"
            })
        }

        await User.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: "Successful user delete"
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok:false,
            msg: "Something was wrong"
        })
    }
    res.json({
        ok:true,
        uid
    })
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}