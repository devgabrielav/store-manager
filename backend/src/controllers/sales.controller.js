const salesServices = require('../services/sales.service');

const httpMap = {
  SUCCESS: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  DELETED: 204,
};

const getAllSalesRoute = async (_req, res) => {
  const { status, data } = await salesServices.getAllSales();
  const code = httpMap[status];
  return res.status(code).json(data);
};

const getSaleByIdRoute = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesServices.getSaleById(id);
  const code = httpMap[status];

  if (status === 'NOT_FOUND') {
    return res.status(code).json({ message: data.message });
  }
  return res.status(code).json(data);
};

const addNewSale = async (req, res) => {
  const products = req.body;
  const { status, data } = await salesServices.addNewSale(products);
  const code = httpMap[status];

  const result = {
    id: data,
    itemsSold: products,
  };

  return res.status(code).json(result);
};

const deleteSaleRoute = async (req, res) => {
  const { id } = req.params;
  const { status } = await salesServices.deleteSale(id);
  const code = httpMap[status];

  return res.status(code).end();
};

const updateProductQuantity = async (req, res) => {
  const { saleId, productId } = req.params;
  const { quantity } = req.body;

  const { status, data } = await salesServices.updateQuantity(saleId, productId, quantity);
  const code = httpMap[status];

  return res.status(code).json(data);
};

module.exports = {
  getAllSalesRoute,
  getSaleByIdRoute,
  addNewSale,
  deleteSaleRoute,
  updateProductQuantity,
};