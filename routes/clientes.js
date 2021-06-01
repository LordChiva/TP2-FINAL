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

router.post('/', async (req, res) => {
    //TODO validar
    let cliente = req.body;
    cliente = await dataCliente.addCliente(cliente);
    res.json(cliente);
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
    let cliente = req.body;
    cliente._id = req.params.id;
    dataCliente.updateCliente(cliente);
    res.json(cliente);
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
    const cliente = await dataCliente.getCliente(req.params.id)
    if (!cliente) {
        res.status(404).send('Cliente no encontrado');
    } else {
        dataCliente.deleteCliente(req.params.id);
        res.status(200).send('Cliente eliminado');
    }
});


module.exports = router;
