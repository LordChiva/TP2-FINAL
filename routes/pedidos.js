const express = require('express');
const router = express.Router();
const dataPedido = require('../data/pedidos');
const joi = require('joi');

// /api/pedidos/
router.get('/', async function (req, res, next) {
    let pedido = await dataPedido.getPedidos();
    res.json(pedido);
});

router.get('/:id', async (req, res) => {
    const pedido = await dataPedido.getPedido(req.params.id);
    if (pedido) {
        res.json(pedido);
    } else {
        res.status(404).send('Pedido no encontrado');
    }
});

//  POST: original sin validar-------------------------------
// let pedido = req.body;
// pedido = await dataPedido.addPedido(pedido);
// res.json(pedido);
//-------------------------------------------------------
router.post('/', async (req, res) => {
    const schema = joi.object({
        empleado_id: joi.string().alphanum().required(),
        cliente_id: joi.string().alphanum().required(),
        item_producto: joi.array(),
        //producto_id: joi.string().alphanum().required(), //revisar
        //cantidad: joi.number().min(1).max(9999), //revisar
        //subTotal: joi.number().min(1).max(999999), //revisar
        cantidadTotal: joi.number().min(1).max(999999),
        total: joi.number().min(1).max(999999),
    });
    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
    } else {
        let pedido = req.body;
        pedido = await dataPedido.addPedido(pedido);
        res.json(pedido);
    }
});

//--------PUT -->original sin validar<
// let pedido = req.body;
// pedido._id = req.params.id;
// dataPedido.updatePedido(pedido);
// res.json(pedido);
router.put('/:id', async (req, res) => {
    const schema = joi.object({
        empleado_id: joi.string().alphanum().required(),
        cliente_id: joi.string().alphanum().required(),
        item_producto: joi.array().required(),
        producto_id: joi.string().alphanum(), //no esta requerido
        cantidad: joi.number().min(1).max(9999),
        subTotal: joi.number().min(1).max(999999),
        cantidadTotal: joi.number().min(1).max(999999),
        total: joi.number().min(1).max(999999),
    });
    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
    } else {
        let pedido = req.body;
        pedido._id = req.params.id;
        dataPedido.updatePedido(pedido);
        res.json(pedido);
    }
});

router.delete('/:id', async (req, res) => {
    const pedido = await dataPedido.getPedido(req.params.id)
    if (!pedido) {
        res.status(404).send('Pedido no encontrado');
    } else {
        dataPedido.deletePedido(req.params.id);
        res.status(200).send('Pedido eliminado');
    }
});

module.exports = router;
