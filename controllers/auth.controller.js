const { response, json } = require('express');

const User = require('../models/users.model');

const bcrypt = require('bcryptjs');

const { generateJWT } = require('../helpers/jwt');

const { googleVerify } = require('../helpers/googleVerify');

const { getMenuFrontEnd } = require('../helpers/menuFrontEnd');


const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const userDB = await User.findOne({ email });

        if (!userDB) {
            res.status(404).json({
                ok: false,
                msg: "Email not found"
            })
        }

        const validPassword = await bcrypt.compare(password, userDB.password);

        if (!validPassword) {
            res.status(400).json({
                ok: false,
                msg: "Incorrect Password"
            })
        }

        const token = await generateJWT(userDB.id);


        res.json({
            ok: true,
            msg: "Login success",
            token,
            menu: getMenuFrontEnd(userDB.role)
        })


    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Something was wrong"
        })
    }
}

const loginGoogle = async (req, res = response) => {

    const token = req.body.token;

    const { name, email, picture } = await googleVerify(token);

    const user = await User.findOne({ email });
    let userT;

    if (!user) {
        userT = new User({
            name: name,
            email,
            password: ' ',
            img: picture,
            google: true
        })
    } else {
        userT = user;
        userT.google = true;
    }

    await userT.save();

    const tokenT = await generateJWT(userT.id);


    try {
        res.json({
            ok: true,
            token: tokenT,
            menu: getMenuFrontEnd(userT.role)
        })
    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: "Validation Error"
        })
    }


}

const renewJWT = async (req, res = response) => {
    const uid = req.uid;

    let user = await User.findById(uid);

    if (!user) {
        res.status(401).json({
            ok: false,
            msg: "User not found"
        })
    }

    const token = await generateJWT(uid);

    res.json({
        ok: true,
        token,
        user,
        menu: getMenuFrontEnd(user.role)
    })
}

module.exports = {
    login,
    loginGoogle,
    renewJWT
}