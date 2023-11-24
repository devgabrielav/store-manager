const salesModel = require('../models/sales.model');

const getAllSales = async () => {
  const sales = await salesModel.getAll();

  if (sales.length === 0) {
    return { status: 'SUCCESS', data: [] };
  }
  return { status: 'SUCCESS', data: sales };
};

const getSaleById = async (id) => {
  const sale = await salesModel.getById(id);

  if (!sale || sale.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }

  return { status: 'SUCCESS', data: sale };
};

const addNewSale = async (products) => {
  const saleId = await salesModel.addNewSaleBd(products);
  return { status: 'CREATED', data: saleId };
};

const deleteSale = async (id) => {
  await salesModel.deleteSaleDb(id);

  return { status: 'DELETED' };
};

const updateQuantity = async (saleId, productId, quantity) => {
  const response = await salesModel.updateProductQuant(saleId, productId, quantity);

  return { status: 'SUCCESS', data: response };
};

module.exports = {
  getAllSales,
  getSaleById,
  addNewSale,
  deleteSale,
  updateQuantity,
};