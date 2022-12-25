const jwt = require('jsonwebtoken');
const User = require('../models/User');


const authUser = async (req,res,next)=>{
    try {
        const {token} = req.headers;
        if(!token)
            return res.status(400).json({err : "token not added"})


        const verify = jwt.verify(token,process.env.jwtsecretkey)
        if (!verify) 
            return res.status(400).json({err : "token not valid"})
        const user = await User.findById(verify.id)
        if(!user)
            return res.status(404).json({msg : 'not found'})
        req.user = user; // creating new field in request
        next();
    } catch (error) {
        return res.status(500).json({error : error.message})
    }
}

module.exports = authUser