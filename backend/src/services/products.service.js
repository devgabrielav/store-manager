const { productsModel } = require('../models');

const getAllProducts = async () => {
  const products = await productsModel.getAll();

  if (products.length === 0) {
    return { status: 'SUCCESS', data: [] };
  }
  return { status: 'SUCCESS', data: products };
};

const getProductById = async (id) => {
  const product = await productsModel.getById(id);

  if (!product) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }

  return { status: 'SUCCESS', data: product };
};

module.exports = {
  getAllProducts,
  getProductById,
};