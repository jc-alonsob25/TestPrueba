const mongoose = require('mongoose');
var app = require("./src/app");
require('dotenv').config(); //Variables de entorno
const PORT = process.env.PORT || 3800;

const MONGO_URI = process.env.MONGO_URI
console.log(MONGO_URI);
mongoose.connect(MONGO_URI)
.then(() => {
    console.log("Conectado correctamente a mongodb");

    var server = app.listen(PORT, function () {
        console.log("Express App running at http://127.0.0.1:3800/");
    })
})
.catch(err => console.error('❌ Error conectando a MongoDB:', err));