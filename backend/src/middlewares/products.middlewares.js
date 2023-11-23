const productsModel = require('../models/products.model');

const nameValidation = (req, res, next) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: '"name" is required' });

  if (name.length < 5) {
    return res.status(422)
      .json({ message: '"name" length must be at least 5 characters long' }); 
  }

  next();
};

const validateProductId = async (req, res, next) => {
  const { id } = req.params;

  const productExists = await productsModel.getById(id);

  if (!productExists) return res.status(404).json({ message: 'Product not found' });

  next();
};

module.exports = {
  nameValidation,
  validateProductId,
};