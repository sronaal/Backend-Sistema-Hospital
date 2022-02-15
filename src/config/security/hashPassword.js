const crypto = require("crypto-js")


exports.cifrarContraseña = (contraseña) =>{

    return crypto.MD5(contraseña).toString()
}

exports.validarContraseña = (hashPassword,Password) =>{

    let contraseña = crypto.MD5(Password).toString()

    if(contraseña == hashPassword){
        return true
    }else{
        return false
    }
}