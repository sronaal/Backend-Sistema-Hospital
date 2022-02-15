class validaciones {


    validarDatosPaciente(datoPaciente) {

        if (datoPaciente.nombre == undefined || datoPaciente.apellido == undefined ||
            datoPaciente.correo == undefined || datoPaciente.contraseña == undefined ||
            datoPaciente.telefono == undefined || datoPaciente.ciudad == undefined) {

            return false
        } else {
            return true
        }
    }

    validarLoginPaciente(datosLogin) {

        if (datosLogin.correo == undefined || datosLogin.correo == undefined) {
            return false
        } else {
            return true
        }
    }

    validarDatosMedico(medicoDatos) {

        if (medicoDatos.nombre == undefined || medicoDatos.apellido == undefined ||
            medicoDatos.correo == undefined || medicoDatos.contraseña == undefined ||
            medicoDatos.telefono == undefined || medicoDatos.consultorio == undefined ||
            medicoDatos.rol == undefined) {
            return false
        } else {
            return true
        }
    }

    validarLoginMedico(datosLogin){

        if(datosLogin.correo == undefined || datosLogin.contraseña == undefined){
            return false
        }else{
            return true
        }
    }
}

module.exports = validaciones