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

const deleteProduct = async (id) => {
  await productsModel.deleteProductDb(id);

  return { status: 'DELETED' };
};

const getProdsQuery = async (q) => {
  if (!q || q.length === 0) {
    const allProducts = await productsModel.getAll();
    return { status: 'SUCCESS', data: allProducts };
  }

  const result = await productsModel.getProductsByQuery(q);
  
  if (result.length === 0) {
    return { status: 'SUCCESS', data: [] };
  }

  return { status: 'SUCCESS', data: result };
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getProdsQuery,
};