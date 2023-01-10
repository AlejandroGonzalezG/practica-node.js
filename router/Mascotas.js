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

router.get('/crear', (req, res)=> {
    res.render('crear')
})

router.post('/', async (req, res) => {
    const body = req.body
    try {
        const mascotaDB = new Mascota(body);
        await mascotaDB.save();
        res.redirect('/mascotas')
    } catch (error) {
        console.log(error)
    }
})


router.get('/:id', async (req, res) =>{
    const id = req.params.id;

    try {
        const mascotaDB = await Mascota.findOne({ _id: id })
        res.render('detalle', {
            mascota: mascotaDB,
            error: false
        })
    } catch (error) {
        res.render('detalle', {
            error: true,
            mensaje: 'No se ha encontrado una Mascota con el id indicado'
        })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const mascotaDB = await Mascota.findByIdAndDelete({ _id:id })

        if(mascotaDB){
            res.json({
                estado: true,
                mensaje: 'Registro de Mascota eliminado!'
            })
        } else {
            res.json({
                estado: false,
                mensaje: 'No se pudo eliminar el Registro de la Mascota'
            })
        }
    } catch (error) {
        console.log(error)        
    }
})

module.exports = router;