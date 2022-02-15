const app = require('./app')
require("./config/database/database")
const PORT = process.env.PORT || 3000

app.listen(PORT,'0.0.0.0',() => {
    console.log("SERVIDOR ACTIVO ", PORT)
})