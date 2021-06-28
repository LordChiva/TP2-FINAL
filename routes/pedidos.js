const express = require('express');
const router = express.Router();
const dataPedido = require('../data/pedidos');
const joi = require('joi');
const templatePedido = require('../templates/pedidoTemplate');

// /api/pedidos/
router.get('/', async function (req, res, next) {
    let pedido = await dataPedido.getPedidos();
    res.json(pedido);
});

// /api/pedidos/[id]
router.get('/:id', async (req, res) => {
    const pedido = await dataPedido.getPedido(req.params.id);
    if (pedido) {
        res.json(pedido);
    } else {
        res.status(404).send('Pedido no encontrado');
    }
});

// /api/pedidos/
router.post('/', async (req, res) => {
    const schema = joi.object({
        fechahora: joi.string().required(),
        empleado_id: joi.string().alphanum().required(),
        cliente_id: joi.string().alphanum().required(),
        item_producto: joi.array(),
        subTotal: joi.number().min(0).max(999999),
        cantidadTotal: joi.number().min(0).max(999999),
        total: joi.number().min(0).max(999999),
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

// /api/pedidos/[id]
router.put('/:id', async (req, res) => {
    const schema = joi.object({
        fechahora: joi.string().required(),
        empleado_id: joi.string().alphanum().required(),
        cliente_id: joi.string().alphanum().required(),
        item_producto: joi.array().required(),
        producto_id: joi.string().alphanum(), //no esta requerido
        cantidad: joi.number().min(0).max(9999),
        subTotal: joi.number().min(0).max(999999),
        cantidadTotal: joi.number().min(0).max(999999),
        total: joi.number().min(0).max(999999),
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

// /api/pedidos/[id]
router.delete('/:id', async (req, res) => {
    const pedido = await dataPedido.getPedido(req.params.id)
    if (!pedido) {
        res.status(404).send('Pedido no encontrado');
    } else {
        dataPedido.deletePedido(req.params.id);
        res.status(200).send('Pedido eliminado');
    }
});

// /api/pedidos/generatorPDF/[id]
router.get('/generatorPDF/:id', async (req, res) => {
    const pedido = await dataPedido.getPedido(req.params.id);
    if (pedido) {
        templatePedido.generar(pedido);
    } else {
        res.status(404).send('Pedido no encontrado');
    }
});

//Se exporta el router
module.exports = router;
