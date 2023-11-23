const { Router } = require('express');
const productsController = require('../controllers/products.controller');
const { nameValidation, validateProductId } = require('../middlewares/products.middlewares');

const productsRoutes = Router();

productsRoutes.get('/', productsController.getAllProductsRoute);

productsRoutes.post('/', nameValidation, productsController.addProductRoute);

productsRoutes.put(
  '/:id', 
  nameValidation, 
  validateProductId,
  productsController.updateProductRoute,
);

productsRoutes.get('/:id', productsController.getProductByIdRoute);

module.exports = productsRoutes;