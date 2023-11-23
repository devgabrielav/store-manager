const { getById } = require('../models/products.model');

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

const productIdExists = async (req, res, next) => {
  const sales = req.body;
  const findProd = await Promise.all(sales.map((sale) => {
    const findProdId = getById(sale.productId);
    return findProdId;
  }));

  if (findProd.includes(undefined)) {
    return res.status(404).json({ message: 'Product not found' });
  }

  next();
};

module.exports = {
  keysExist,
  quantityValidate,
  productIdExists,
};