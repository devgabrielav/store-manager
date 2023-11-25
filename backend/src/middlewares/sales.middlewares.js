const productsModel = require('../models/products.model');
const salesModel = require('../models/sales.model');

const keysExist = (req, res, next) => {
  const sales = req.body;
  let returnMessage;

  const validate = sales.map((sale) => {
    if (!sale.productId) {
      returnMessage = '"productId" is required';
      return false;
    }

    if (sale.quantity === undefined) {
      returnMessage = '"quantity" is required';
      return false;
    }

    return true;
  });

  if (validate.includes(false)) {
    return res.status(400).json({ message: returnMessage });
  }

  next();
};

const quantityValidate = (req, res, next) => {
  const sales = req.body;
  let returnMessageQuant;

  const validation = sales.map((sale) => {
    if (sale.quantity <= 0) {
      returnMessageQuant = '"quantity" must be greater than or equal to 1';
      return false;
    }

    return true;
  });

  if (validation.includes(false)) {
    return res.status(422).json({ message: returnMessageQuant });
  }

  next();
};

const findAllProdIds = async (sales) => {
  const result = await Promise.all(sales.map((sale) => {
    const findProdId = productsModel.getById(sale.productId);
    return findProdId;
  }));

  return result;
};

const productIdExists = async (req, res, next) => {
  const sales = req.body;
  const findProd = await findAllProdIds(sales);

  if (findProd.includes(undefined)) {
    return res.status(404).json({ message: 'Product not found' });
  }

  next();
};

const saleExists = async (req, res, next) => {
  const { id } = req.params;
  const findSale = await salesModel.findSaleById(id);

  if (findSale === undefined) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  next();
};

const quantityExistsAndIsValid = async (req, res, next) => {
  const { quantity } = req.body;

  if (quantity === undefined) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  if (quantity <= 0) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

const productAndSaleExists = async (req, res, next) => {
  const { saleId, productId } = req.params;

  const findSale = await salesModel.findSaleById(saleId);
  if (findSale === undefined) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  const findProdInSale = await salesModel.findProdSale(saleId, productId);
  if (findProdInSale === undefined) {
    return res.status(404).json({ message: 'Product not found in sale' });
  }

  next();
};

module.exports = {
  keysExist,
  quantityValidate,
  productIdExists,
  saleExists,
  findAllProdIds,
  quantityExistsAndIsValid,
  productAndSaleExists,
};