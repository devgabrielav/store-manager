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

const addProduct = async (productName) => {
  const insertId = await productsModel.addProductDb(productName);
  const product = {
    id: insertId,
    name: productName,
  };

  return { status: 'CREATED', data: product };
};

const updateProduct = async (id, name) => {
  const product = await productsModel.updateProductDb(id, name);

  return { status: 'SUCCESS', data: product };
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
};