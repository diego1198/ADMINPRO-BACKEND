const jwt = require("jsonwebtoken");

const User = require("../models/users.model");

const validateJWT = (req, res, next) => {

    const token = req.header('x-token');

    if (!token) {
        res.status(401).json({
            ok: false,
            msg: "Token unknown"
        })
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = uid;

        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Invalid Token"
        })
    }

}

const validateRole = async (req, res, next) => {
    const uid = req.uid;
    try {

        const user = await User.findById(uid);

        if(!user){
            return res.status(404).json({
                ok: false,
                msg: "User not found"
            })    
        }

        if(user.role !== 'ADMIN_ROLE'){
            return res.status(403).json({
                ok: false,
                msg: "User dont have privilegies"
            })
        }

        next();
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Something was wrong"
        })
    }
}

const validateRoleOrSameUser = async (req, res, next) => {
    const uid = req.uid;
    const id = req.params.uid;

    try {

        const user = await User.findById(uid);

        if(!user){
            return res.status(404).json({
                ok: false,
                msg: "User not found"
            })    
        }

        if(user.role === 'ADMIN_ROLE' || uid === id){
            next();
        }else{
            return res.status(403).json({
                ok: false,
                msg: "User dont have privilegies"
            })
        }
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Something was wrong"
        })
    }
}

module.exports = {
    validateJWT,
    validateRole,
    validateRoleOrSameUser
}