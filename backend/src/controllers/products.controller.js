const productsServices = require('../services/products.service');

const httpMap = {
  SUCCESS: 200,
  CREATED: 201,
  NOT_FOUND: 404,
};

const getAllProductsRoute = async (_req, res) => {
  const { status, data } = await productsServices.getAllProducts();
  const code = httpMap[status];
  return res.status(code).json(data);
};

const getProductByIdRoute = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsServices.getProductById(id);
  const code = httpMap[status];

  if (status === 'NOT_FOUND') {
    return res.status(code).json({ message: data.message });
  }
  return res.status(code).json(data);
};

const addProductRoute = async (req, res) => {
  const { name } = req.body;
  const { status, data } = await productsServices.addProduct(name);
  const code = httpMap[status];

  return res.status(code).json(data);
};

module.exports = {
  getAllProductsRoute,
  getProductByIdRoute,
  addProductRoute,
};