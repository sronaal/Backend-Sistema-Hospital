const routes = require("express").Router()
const controllerPaciente = require('../controllers/controllerPaciente')


// RUTAS PARA USUARIO PACIENTE 
routes.post('/pacientes',controllerPaciente.addPatient)
routes.post('/auth/login',controllerPaciente.logIn)
routes.post('/auth/validate',controllerPaciente.checkMailAndSendOTP)
routes.post('/auth/validate/code',controllerPaciente.checkCodeValide)
routes.post('/auth/changepassword/',controllerPaciente.changePassword)


module.exports = routes