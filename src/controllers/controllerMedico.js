const {request, response} = require("express")
const modeloMedico = require('../models/medico')
const validaciones = require('../config/validators/validators')

let validar = new validaciones()
exports.addDoctor = (req = request, res = response) =>{

    if(validar.validarDatosMedico(req.body)){
        
    }else{
        return res.status(400).json({"mensaje":"Todos los datos son requeridos"})
    }
}