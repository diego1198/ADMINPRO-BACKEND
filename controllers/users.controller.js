const { response, json } = require('express');

const User = require('../models/users.model');

const bcrypt = require('bcryptjs');

const { generateJWT } = require('../helpers/jwt')


const getUsers = async (req, res) => {

    const offset = Number(req.query.offset) || 0;

    const limit = Number(req.query.limit) || 0;

    /* const users = await User
                        .find({}, 'name email role google')
                        .skip( offset)
                        .limit( limit );

    const totalUsers = await User.count(); */

    /* Como las dos promesas son asincronas se desestructura en una promesa simultanea */

    const [users, totalUsers] = await Promise.all([
        User
        .find({}, 'name email role google img')
        .skip( offset)
        .limit( limit ),

        User.countDocuments()

    ]);

    res.json({
        ok: true,
        users: users,
        total: totalUsers,
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

        if( !user.google ){
            fields.email = email;
        }else if( user.email !== email){
            return res.status(400).json({
                ok:false,
                msg:"Google User can't update email"
            });
        }

        const userUpdate = await User.findByIdAndUpdate(uid, fields, { new: true});

        res.json({
            ok:true,
            user:userUpdate
        });



    } catch (error) {
        console.log(error)
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