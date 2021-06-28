const express = require('express');
const router = express.Router();
const dataProducto = require('../data/productos');
const joi = require('joi');

// /api/productos/
router.get('/', async function (req, res, next) {
    let productos = await dataProducto.getProductos();
    res.json(productos);
});

// /api/productos/[id]
router.get('/:id', async (req, res) => {
    const producto = await dataProducto.getProducto(req.params.id);
    if (producto) {
        res.json(producto);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

// /api/productos/
router.post('/', async (req, res) => {
    const schema = joi.object({
        cod: joi.string().alphanum().min(1).max(3).required(),
        gusto: joi.string().min(2).max(50).required(),
        precio: joi.number().min(1).max(1000).required()
    });
    const result = schema.validate(req.body);
    //console.log(result);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
    } else {
        let producto = req.body;
        producto = await dataProducto.addProducto(producto);
        res.json(producto);
    }
});

// /api/productos/[id]
router.put('/:id', async (req, res) => {
    const schema = joi.object({
        cod: joi.string().alphanum().min(1).max(3).required(),
        gusto: joi.string().min(2).max(50).required(),
        precio: joi.number().min(1).max(1000).required()
    });
    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
    } else {
        let producto = req.body;
        producto._id = req.params.id;
        dataProducto.updateProducto(producto);
        res.json(producto);
    }
});

// /api/productos/[id]
router.delete('/:id', async (req, res) => {
    const producto = await dataProducto.getProducto(req.params.id)
    if (!producto) {
        res.status(404).send('Producto no encontrado');
    } else {
        dataProducto.deleteProducto(req.params.id);
        res.status(200).send('Producto eliminado');
    }
});

//Se exporta el router
module.exports = router;