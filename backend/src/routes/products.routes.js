const { Router } = require('express');
const productsController = require('../controllers/products.controller');

const productsRoutes = Router();

productsRoutes.get('/', productsController.getAllProductsRoute);

productsRoutes.post('/', productsController.addProductRoute);

productsRoutes.get('/:id', productsController.getProductByIdRoute);

module.exports = productsRoutes;