const mongoose = require("mongoose")


mongoose.connect(process.env.MONGO_URI)
.then(() =>{
    console.log("DB Conectada")
})
.catch((error) =>{
    console.log(error)
})