const { Router } = require('express');
const Order = require('../models/Order');

module.exports = Router()
  .post('/', async (req, res) => {
    const { product, quantity } = req.body;
    const order = await Order.insert({
      product, quantity
    });

    res.json(order);
  })

  .get('/:id', async (req, res) => {
    const { id } = req.params;

    const order = await Order.getById(id);

    res.json(order);
  })

  .get('/', async (req, res) => {
    const orders = await Order.getAll();
    
    res.json(orders);
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { product, quantity } = req.body;
      
      const order = await Order.updateById(id, { prod: product, qty: quantity });

      res.json(order);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res) => {
    const { id } = req.params;
    const order = await Order.deleteById(id);
    
    res.json(order);
  });
