const mongoose = require("mongoose")


const schemaCita = mongoose.Schema({

    tipoCita:{
        type:String,
        required:true
    },
    fechaCita:{
        type:String,
        required:true
    },
    medico:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medico'
    },
    paciente:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Paciente'
    }
    
})

module.exports = mongoose.model('Cita',schemaCita)