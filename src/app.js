const express = require("express")
const cors = require("cors")
const rutas = require('./routes/rutas')
require("dotenv").config()

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api',rutas)

module.exports = app