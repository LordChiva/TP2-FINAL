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

router.post('/', async (req, res) => {
    //TODO validar

    /*  >original sin validar<
        let pedido = req.body;
        pedido = await dataPedido.addPedido(pedido);
        res.json(pedido); */

    const pedido = joi.object({
        /* first: joi.string().alphanum().min(3).required(),
        last: joi.string().alphanum().min(3).required(),
        year: joi.number().min(1900).max(2020).required() */
    });
    const result = pedido.validate(req.body);
    console.log(result);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
    } else {
        let pedido = req.body;
        pedido = await dataPedido.addPedido(pedido);
        res.json(pedido);
    }
    
});

// -------- POST CON VALIDACION ---modelo del profesor------CLASE 19 DE MAYO-------------
/* router.post('/', async (req, res) => {
    const schema = joi.object({
        first: joi.string().alphanum().min(3).required(),
        last: joi.string().alphanum().min(3).required(),
        year: joi.number().min(1900).max(2020).required()
    });
    const result = schema.validate(req.body);
    console.log(result);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
    } else {
        let inventor = req.body;
         inventor = await dataInventor.addInventor(inventor);
         res.json(inventor);
    }
}); */

router.put('/:id', async (req, res) => {
    /*  >original sin validar<
        let pedido = req.body;
        pedido._id = req.params.id;
        dataPedido.updatePedido(pedido);
        res.json(pedido); */
    
    const pedido = joi.object({
        /* first: joi.string().alphanum().min(3),
        last: joi.string().alphanum().min(3),
        year: joi.number().min(1400).max(2020) */
    });
    const result = pedido.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
    } else {
        let pedido = req.body;
        pedido._id = req.params.id;
        dataPedido.updatePedido(pedido);
        res.json(pedido);
    }
});

//---------- PUT CON VALIDACION -----modelo del profesor------CLASE 19 DE MAYO-------------
/* router.put('/:id', async (req, res) => {
    const schema = joi.object({
        first: joi.string().alphanum().min(3),
        last: joi.string().alphanum().min(3),
        year: joi.number().min(1400).max(2020)
    });
    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
    } else {
        let inventor = req.body;
        inventor._id = req.params.id;
        dataInventor.updateInventor(inventor);
        res.json(inventor);
    }
}); */


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
