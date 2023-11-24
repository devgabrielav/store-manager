const { Router } = require('express');
const salesController = require('../controllers/sales.controller');
const { keysExist, quantityValidate, 
  productIdExists, saleExists,
  quantityExistsAndIsValid,
  productAndSaleExists } = require('../middlewares/sales.middlewares');

const salesRoutes = Router();

salesRoutes.get('/', salesController.getAllSalesRoute);

salesRoutes.post('/', keysExist, quantityValidate, productIdExists, salesController.addNewSale);

salesRoutes.get('/:id', salesController.getSaleByIdRoute);

salesRoutes.delete('/:id', saleExists, salesController.deleteSaleRoute);

salesRoutes.put(
  '/:saleId/products/:productId/quantity', 
  quantityExistsAndIsValid,
  productAndSaleExists,
  salesController.updateProductQuantity,
);

module.exports = salesRoutes;