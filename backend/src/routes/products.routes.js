const { Router } = require('express');
const productsController = require('../controllers/products.controller');
const { nameValidation } = require('../middlewares/products.middlewares');

const productsRoutes = Router();

productsRoutes.get('/', productsController.getAllProductsRoute);

productsRoutes.post('/', nameValidation, productsController.addProductRoute);

productsRoutes.get('/:id', productsController.getProductByIdRoute);

module.exports = productsRoutes;