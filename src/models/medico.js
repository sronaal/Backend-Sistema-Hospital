const mongoose = require("mongoose")


const schemaMedico = mongoose.Schema({

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
    consultorio:{
        type:Number,
        required:true
    },
    rol:{
        type:String,
        Default:'Medico'
    }

})


module.exports = mongoose.model('Medico', schemaMedico)