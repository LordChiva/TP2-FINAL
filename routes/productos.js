const express = require('express');
const router = express.Router();
const dataProducto = require('../data/productos');
const joi = require('joi');

// /api/clientes/
router.get('/', async function (req, res, next) {
    let productos = await dataProducto.getProductos();
    res.json(productos);
});

router.get('/:id', async (req, res) => {
    const producto = await dataProducto.getProducto(req.params.id);
    if (producto) {
        res.json(producto);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

router.post('/', async (req, res) => {
    //TODO validar
    let producto = req.body;
    producto = await dataProducto.addProducto(producto);
    res.json(producto);
});

// -------- POST CON VALIDACION -------------------------
// router.post('/', async (req, res) => {
//     const schema = joi.object({
//         first: joi.string().alphanum().min(3).required(),
//         last: joi.string().alphanum().min(3).required(),
//         year: joi.number().min(1900).max(2020).required()
//     });
//     const result = schema.validate(req.body);
//     console.log(result);
//     if (result.error) {
//         res.status(400).send(result.error.details[0].message);
//     } else {
//         let inventor = req.body;
//         inventor = await dataInventor.addInventor(inventor);
//         res.json(inventor);
//     }
// });

router.put('/:id', async (req, res) => {
    let producto = req.body;
    producto._id = req.params.id;
    dataProducto.updateProducto(producto);
    res.json(producto);
});

//---------- PUT CON VALIDACION --------------------
// router.put('/:id', async (req, res) => {
//     const schema = joi.object({
//         first: joi.string().alphanum().min(3),
//         last: joi.string().alphanum().min(3),
//         year: joi.number().min(1400).max(2020)
//     });
//     const result = schema.validate(req.body);
//     if (result.error) {
//         res.status(400).send(result.error.details[0].message);
//     } else {
//         let inventor = req.body;
//         inventor._id = req.params.id;
//         dataInventor.updateInventor(inventor);
//         res.json(inventor);
//     }
// });


router.delete('/:id', async (req, res) => {
    const producto = await dataProducto.getProducto(req.params.id)
    if (!producto) {
        res.status(404).send('Producto no encontrado');
    } else {
        dataProducto.deleteProducto(req.params.id);
        res.status(200).send('Producto eliminado');
    }
});


module.exports = router;