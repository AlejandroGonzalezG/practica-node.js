const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("mascotas", {
        arrayMascotas: [
            {id: '1111', nombre: 'Cooper', descripcion: 'cooper descripcion'},
            {id: '2222', nombre: 'Robin', descripcion: 'robin descripcion'}
        ]
    })
});

module.exports = router;