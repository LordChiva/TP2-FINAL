const express = require('express');
const router = express.Router();
const dataCliente = require('../data/clientes');
const joi = require('joi');

// /api/clientes/
router.get('/', async function (req, res, next) {
    let clientes = await dataCliente.getClientes();
    res.json(clientes);
});

router.get('/:id', async (req, res) => {
    const cliente = await dataCliente.getCliente(req.params.id);
    if (cliente) {
        res.json(cliente);
    } else {
        res.status(404).send('Cliente no encontrado');
    }
});

//--------------------POST sin validacion FUNCIONANDO --------------------
// router.post('/', async (req, res) => {
//     //TODO validar
//     let cliente = req.body;
//     cliente = await dataCliente.addCliente(cliente);
//     res.json(cliente);
// });

router.post('/', async (req, res) => {
    const schema = joi.object({
        nro_cliente: joi.number().min(0).max(999999).required(),  //debe ser autoincremental
        nombre: joi.string().alphanum().min(2).required(),
        apellido: joi.string().alphanum().min(2).required(),
        email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        direccion:joi.string().required(),
    });
    const result = schema.validate(req.body);
    console.log(result);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
    } else {
        let cliente = req.body;
        cliente = await dataCliente.addCliente(cliente);
        res.json(cliente);
    }
});

//----------------PUT sin validacion FUNCIONANDO----------------------------
// router.put('/:id', async (req, res) => {
//     let cliente = req.body;
//     cliente._id = req.params.id;
//     dataCliente.updateCliente(cliente);
//     res.json(cliente);
// });

router.put('/:id', async (req, res) => {
const schema = joi.object({
        nro_cliente: joi.number().min(0).max(999999).required(),
        nombre: joi.string().alphanum().min(2).required(),
        apellido: joi.string().alphanum().min(2).required(),
        email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        direccion:joi.string().required(),
    });
    const result = schema.validate(req.body);
    console.log(result);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
    } else {
     let cliente = req.body;
    cliente._id = req.params.id;
    dataCliente.updateCliente(cliente);
    res.json(cliente);
    }
});

router.delete('/:id', async (req, res) => {
    const cliente = await dataCliente.getCliente(req.params.id)
    if (!cliente) {
        res.status(404).send('Cliente no encontrado');
    } else {
        dataCliente.deleteCliente(req.params.id);
        res.status(200).send('Cliente eliminado');
    }
});

module.exports = router;
