const jwt = require("jsonwebtoken");

const validateJWT = (req,res,next) =>{

    const token = req.header('x-token');
    
    if(!token){
        res.status(401).json({
            ok:false,
            msg: "Token unknown"
        })
    }

    try {
        
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = uid;

        next();

    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:"Invalid Token"
        })
    }
    
}

module.exports = {
    validateJWT
}