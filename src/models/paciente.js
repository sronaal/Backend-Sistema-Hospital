const mongoose = require("mongoose")


const schemaPaciente = mongoose.Schema({

    nombre:{
        type:String,
        required:true
    },
    apellido:{
        type:String,
        required:true
    },
    correo:{
        type:String,
        required:true
    },
    contraseña:{
        type:String,
        required:true
    },
    telefono:{
        type:String,
        required:true
    },
    ciudad:{
        type:String,
        required:true
    },
    rol:{
        type:String,
        Default:'Paciente'
    }

})


module.exports = mongoose.model('Paciente', schemaPaciente)