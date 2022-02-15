const {request, response} = require("express")

const modeloMedico = require('../models/medico')
const validaciones = require('../config/validators/validators')
const hashPassword = require('../config/security/hashPassword')
const jwt = require('../config/security/jwt')

let validar = new validaciones()


exports.addDoctor = (req = request, res = response) =>{

    if(validar.validarDatosMedico(req.body)){

        let medico = new modeloMedico(req.body)
        let passwordHash =  hashPassword.cifrarContraseña(req.body.contraseña)

        medico.contraseña = passwordHash

        modeloMedico.create(medico)
        .then((data) => res.status(201).json({"mensaje":"medico registrado","data":data}))
        .catch((error) => res.status(400).json({"mensaje":error}))

    }else{
        return res.status(400).json({"mensaje":"Todos los datos son requeridos"})
    }
}


exports.LogIn = async (req = request,res = response) =>{

    if(validar.validarLoginMedico(req.body)){

        let usuario = modeloMedico.findOne({corre:req.body.correo})

        if(!usuario) res.status(401).json({"mensaje":"Correo y/o Contraseña invalidos"})

        if(!hashPassword.validarContraseña(usuario.contraseña,req.body.contraseña)) res.status(401).json({"mensaje":"Correo y/o Contraseña invalidos"})


        let token = jwt.generarToken(usuario._id)
        
        res.status(200).json({"token":token})

    }else{
        return res.status(400).json({"mensaje":"Todos los datos son requeridos"})        
    }
}