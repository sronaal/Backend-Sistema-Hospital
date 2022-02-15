const nodemailer = require("nodemailer")

const validateOTP = require('../security/ValidateOTP')



exports.confirmacionCreacionCuena = (correo, nombre, apellido) => {
    console.log(correo, nombre, apellido)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.correo,
            pass: process.env.pass
        }
    });

    const mailOptions = {
        from: 'SISTEMA HOSPITAL',
        to: correo,
        subject: 'Creacion Cuenta Sistema Hospital',
        text: `Bienvenido ${nombre} ${apellido} Su cuenta en el Sistema Hospital ha sido creada`
    }

    transporter.sendMail(mailOptions, function (error, info) {

        if (error) {
            console.log(error)
            return false
        } else {
            console.log(info)
            return true
        }
    })
}


exports.sendCode = (correo) => {

    code = validateOTP.generateCode()

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.correo,
            pass: process.env.pass
        }
    });

    const mailOptions = {
        from: 'Cambio de contraseña',
        to: correo,
        subject:'Cambio de contraseña',
        text:`El codigo es ${code} expirara en 5 minutos y tiene un solo uso.`
    }
}