const { Router } = require('express');
const salesController = require('../controllers/sales.controller');

const salesRoutes = Router();

salesRoutes.get('/', salesController.getAllSalesRoute);

salesRoutes.get('/:id', salesController.getSaleByIdRoute);

module.exports = salesRoutes;