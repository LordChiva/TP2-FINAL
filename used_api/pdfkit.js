const express = require('express');
const router = express.Router();
const dataPedido = require('../data/pedidos');
const pdf = require('../used_api/plantilla')

router.get('/:id', async (req, res) => {
  const pedido = await dataPedido.getPedido(req.params.id);
  if (pedido) {
      pdf.pedidoPdf(pedido);
      console.log('PDF creado exitosamente.');
  } else {
      res.status(404).send('Error al crear PDF, pedido no encontrado.');
  }
});