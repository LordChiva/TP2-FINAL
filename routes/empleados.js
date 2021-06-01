const express = require('express');
const router = express.Router();
const dataEmpleado = require('../data/empleados');
const joi = require('joi');

// /api/empleados/
router.get('/', async function (req, res, next) {
    let clientes = await dataEmpleado.getEmpleados();
    res.json(clientes);
});

router.get('/:id', async (req, res) => {
    const empleado = await dataEmpleado.getEmpleado(req.params.id);
    if (empleado) {
        res.json(empleado);
    } else {
        res.status(404).send('Empleado no encontrado');
    }
});

router.post('/', async (req, res) => {
    //TODO validar
    let empleado = req.body;
    empleado = await dataEmpleado.addEmpleado(empleado);
    res.json(empleado);
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
    let empleado = req.body;
    empleado._id = req.params.id;
    dataEmpleado.updateEmpleado(empleado);
    res.json(empleado);
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
    const empleado = await dataEmpleado.getEmpleado(req.params.id)
    if (!empleado) {
        res.status(404).send('Empleado no encontrado');
    } else {
        dataEmpleado.deleteEmpleado(req.params.id);
        res.status(200).send('Empleado eliminado');
    }
});


module.exports = router;
