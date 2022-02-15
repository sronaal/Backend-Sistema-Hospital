const jwt = require("jsonwebtoken")
const {request,response} = require("express")

const SECRET_KEY = process.env.SECRET_JWT

exports.generarToken = (userId) =>{
    return jwt.sign({userId},SECRET_KEY,{expiresIn: '1000m'})
}

exports.validarToken = (req = request,res = response,next) =>{

    const accessToken = req.headers['authorization']

    if(!accessToken) res.status(401).json({"mensaje":"Access Denied"})

    jwt.verify(accessToken,SECRET_KEY, (err, user) =>{

        if(err){
            res.status(401).json({"mensaje":"Access Denied"})
        }else{
            next()
        }
    });
}
