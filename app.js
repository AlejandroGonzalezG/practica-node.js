const express = require('express');
const bodyParser = require('body-parser')
const app = express();

// parse application/x-www-form-urLencoded
app.use(bodyParser.urlencoded({ extended: false}));
// parse application/json
app.use(bodyParser.json());



require('dotenv').config();

const port = process.env.PORT || 3000;


// Conexión a base de datos con Mongoose y Mongodb
const mongoose = require('mongoose');


const uri = `mongodb+srv://ejercicio_node:${process.env.PASSWORD}@clusterprueba.7sgpdv8.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

mongoose.connect(uri, 
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Base de datos conectada correctamente"))
    .catch(e => console.log(e))


// motor de plantillas
app.set('view engine', 'ejs');

app.set('views', __dirname + '/views');

app.use(express.static(__dirname + "/public"));

// Rutas Web
app.use('/', require('./router/RutasWeb'));
app.use('/mascotas', require('./router/Mascotas'));

app.use((req, res, next) => {
    res.status(404).render("404")
})

app.listen(port, () => {
    console.log('servidor a su servicio en el puerto', port)
});

