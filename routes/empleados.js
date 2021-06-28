const express = require('express');
const router = express.Router();
const dataEmpleado = require('../data/empleados');
const joi = require('joi');
const auth = require('../middleware/auth');

// /api/empleados/
router.get('/', auth, async function (req, res, next) {
    let empleados = await dataEmpleado.getEmpleados();
    res.json(empleados);
});

// /api/empleados/[id]
router.get('/:id', auth, async (req, res) => {
    const empleado = await dataEmpleado.getEmpleado(req.params.id);
    if (empleado) {
        res.json(empleado);
    } else {
        res.status(404).send('Empleado no encontrado');
    }
});

// /api/empleados/
router.post('/', async (req, res) => {
    const schema = joi.object({
        //legajo: joi.number().alphanum().min(1000).max(9999).required(),
        legajo: joi.number().min(1000).max(9999).required(),
        nombre: joi.string().alphanum().min(2).max(50).required(),
        password: joi.string().pattern(new RegExp('^[a-zA-Z0-9@#$%&]{3,30}$')).required(),
    });
    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
    } else {
        let empleado = req.body;
        empleado = await dataEmpleado.addEmpleado(empleado);
        res.json(empleado);
    }
});

// /api/empleados/[id]
router.put('/:id', async (req, res) => {
    const schema = joi.object({
        legajo: joi.number().min(1000).max(9999).required(),
        nombre: joi.string().min(2).max(50).required(),
        password: joi.string().pattern(new RegExp('^[a-zA-Z0-9!@#$%&]{3,30}$')).required(),
    });
    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
    } else {
        let empleado = req.body;
        empleado._id = req.params.id;
        dataEmpleado.updateEmpleado(empleado);
        res.json(empleado);
    }
});

// /api/empleados/[id]
router.delete('/:id', async (req, res) => {
    const empleado = await dataEmpleado.getEmpleado(req.params.id)
    if (!empleado) {
        res.status(404).send('Empleado no encontrado');
    } else {
        dataEmpleado.deleteEmpleado(req.params.id);
        res.status(200).send('Empleado eliminado');
    }
});

// /api/empleados/login
router.post('/login', async (req, res) => {
    try {
        const user = await dataEmpleado.findByCredentials(req.body.legajo, req.body.password);
        const token = dataEmpleado.generateAuthToken(user);
        res.send({ user, token });
    } catch (error) {
        res.status(401).send(error.message);
    }
});

//Se exporta el router
module.exports = router;
