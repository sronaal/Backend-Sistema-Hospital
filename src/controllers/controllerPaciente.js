const { request, response } = require("express")

const modeloPaciente = require("../models/paciente")
const validaciones = require('../config/validators/validators')
const hashPassword = require('../config/security/hashPassword')
const tokenJWT = require('../config/security/jwt')
const sendMail = require('../config/email/sendMail')
const validateOTP = require('../config/security/ValidateOTP')

const validar = new validaciones()

let idUsuario;



exports.addPatient = async (req = request, res = response) => {


    if (validar.validarDatosPaciente(req.body)) {

        let paciente = new modeloPaciente(req.body)
        let passwordHash = hashPassword.cifrarContraseña(req.body.contraseña) // Cifra la contraseña ingresa

        paciente.contraseña = passwordHash

        modeloPaciente.create(paciente)
            .then((data) => {
                sendMail.confirmacionCreacionCuena(req.body.correo, req.body.nombre, req.body.apellido)
                res.status(201).json({ 'mensaje': 'Paciente Registrado' })
            })
            .catch((error) => {
                res.status(400).json({ 'mensaje': error })
            })

    } else {
        res.status(400).json({ 'mensaje': 'Todos los datos son requeridos' })
    }

}

exports.logIn = async (req = request, res = response) => {

    if (validar.validarLoginPaciente(req.body)) {

        let usuario = modeloPaciente.findOne({ correo: req.body.correo })

        if (!usuario) res.status(401).json({ "mensaje": "Usuario y/o Contraseña Invalidos" })

        if (!hashPassword.validarContraseña(usuario.contraseña == req.body.contraseña))
            res.status(401).json({ "mensaje": "Usuario y/o Contraseña Invalidos" })

        const token = tokenJWT.generarToken(usuario._id)
        res.status(200).json(token)

    } else {
        res.status(400).json({ "mensaje": "Todos los campos son requeridos" })
    }
}

exports.checkMailAndSendOTP = async (req = request, res = response) => {

    if (!req.body.correo == undefined) {

        let usuario = modeloPaciente.findOne({ correo: req.body.correo })

        if (!usuario) res.status(401).json({ "mensaje": "El Usuario con el correo no existe" })

        idUsuario = usuario._id
        sendMail.sendCode(req.body.correo)
        res.status(200).json({ 'mensaje': "Codigo Enviado" })

    } else {
        res.status(401).json({ "mensaje": "Correo obligatorio" })
    }

}

exports.checkCodeValide = async (req = request, res = response) => {


    let FailedAttemp = 0 // Para almacenar los intentos fallidos

    // Establece un limite de 5 intentos 
    while (FailedAttemp <= 3) {
        if (validateOTP.validarCode(req.body.code)) {
            let token = tokenJWT.generarToken(idUsuario)
            res.status(200).json({ "token": token })
        } else {
            res.status(401).json({ "mensaje": "Codigo Invalido" })
        }
    }

    res.status(401).json({ "mensaje": "Demasiados intentos fallidos, genere un nuevo codigo" })
}

exports.changePassword = async (req = request, res = response) =>{

    if(!req.body.contraseña == undefined){

        let usuario = await modeloPaciente.
        findByIdAndUpdate({_id:idUsuario},{contraseña:req.body.contraseña})
        .then(() => res.status(200).json({"mensaje":"Contraseña Restablecidad"}))
        .catch((error) => res.status(400).json({"mensaje": error}))

    }else{
        res.status(400).json({"mensaje":"Contraseña requerida"})
    }

}