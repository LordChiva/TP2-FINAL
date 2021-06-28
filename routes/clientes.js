const express = require('express');
const router = express.Router();
const dataCliente = require('../data/clientes');
const joi = require('joi');

// /api/clientes/
router.get('/', async function (req, res, next) {
    let clientes = await dataCliente.getClientes();
    res.json(clientes);
});

//// /api/clientes/[id]
router.get('/:id', async (req, res) => {
    const cliente = await dataCliente.getCliente(req.params.id);
    if (cliente) {
        res.json(cliente);
    } else {
        res.status(404).send('Cliente no encontrado');
    }
});

// /api/clientes/
router.post('/', async (req, res) => {
    const schema = joi.object({
        nombre: joi.string().min(2).max(50).required(),
        apellido: joi.string().min(2).max(50).required(),
        telefono: joi.number().min(40000000).max(9999999999).required(),  //debe ser autoincremental
        email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        direccion: joi.string().min(2).max(1000).required(),
    });
    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
    } else {
        let cliente = req.body;
        cliente = await dataCliente.addCliente(cliente);
        res.json(cliente);
    }
});

// /api/clientes/ [id]
router.put('/:id', async (req, res) => {
    const schema = joi.object({
        nombre: joi.string().min(2).max(50).required(),
        apellido: joi.string().min(2).max(50).required(),
        telefono: joi.number().min(40000000).max(9999999999),
        email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        direccion: joi.string().min(0).max(1000).required(),
    });
    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
    } else {
        let cliente = req.body;
        cliente._id = req.params.id;
        dataCliente.updateCliente(cliente);
        res.json(cliente);
    }
});

// /api/clientes/ [id]
router.delete('/:id', async (req, res) => {
    const cliente = await dataCliente.getCliente(req.params.id)
    if (!cliente) {
        res.status(404).send('Cliente no encontrado');
    } else {
        dataCliente.deleteCliente(req.params.id);
        res.status(200).send('Cliente eliminado');
    }
});

// Se exporta el router
module.exports = router;
