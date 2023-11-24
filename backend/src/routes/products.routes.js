const { Router } = require('express');
const productsController = require('../controllers/products.controller');
const { nameValidation, validateProductId } = require('../middlewares/products.middlewares');

const productsRoutes = Router();

productsRoutes.get('/', productsController.getAllProductsRoute);

productsRoutes.post('/', nameValidation, productsController.addProductRoute);

productsRoutes.get('/:id', productsController.getProductByIdRoute);

productsRoutes.put(
  '/:id', 
  nameValidation, 
  validateProductId,
  productsController.updateProductRoute,
);

productsRoutes.delete('/:id', validateProductId, productsController.deleteProductRoute);

module.exports = productsRoutes;