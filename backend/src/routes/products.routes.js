const { Router } = require('express');
const productsController = require('../controllers/products.controller');

const productsRoutes = Router();

productsRoutes.get('/', productsController.getAllProductsRoute);

productsRoutes.get('/:id', productsController.getProductByIdRoute);

module.exports = productsRoutes;