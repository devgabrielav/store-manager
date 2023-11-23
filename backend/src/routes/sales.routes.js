const { Router } = require('express');
const salesController = require('../controllers/sales.controller');
const { keysExist, quantityValidate, 
  productIdExists } = require('../middlewares/sales.middlewares');

const salesRoutes = Router();

salesRoutes.get('/', salesController.getAllSalesRoute);

salesRoutes.post('/', keysExist, quantityValidate, productIdExists, salesController.addNewSale);

salesRoutes.get('/:id', salesController.getSaleByIdRoute);

module.exports = salesRoutes;