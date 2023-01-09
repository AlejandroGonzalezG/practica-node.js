const express = require('express');
const router = express.Router();


const Mascota = require('../models/mascota')

router.get('/', async (req, res) => {

    try {
        const arrayMascotasDB = await Mascota.find();
        console.log(arrayMascotasDB)

        res.render("mascotas", {
            arrayMascotas: arrayMascotasDB
            //arrayMascotas: [
            //    {id: '1111', nombre: 'Cooper', descripcion: 'cooper descripcion'},
            //    {id: '2222', nombre: 'Robin', descripcion: 'robin descripcion'}
            //]
        })
        
    } catch (error) {
        console.log(error)
    }

    
});

module.exports = router;