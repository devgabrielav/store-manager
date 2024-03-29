const camelize = require('camelize');
const connection = require('./connection');

const getAll = async () => {
  const [sales] = await connection.execute(
    `SELECT sale_id, date, product_id, quantity FROM sales as s 
    RIGHT JOIN sales_products as sp
    ON s.id = sp.sale_id
    ORDER BY sale_id, product_id;`,
  );

  return camelize(sales);
};

const getById = async (id) => {
  const [sale] = await connection.execute(
    `SELECT date, product_id, quantity FROM sales as s
    RIGHT JOIN sales_products as sp
    ON s.id = sp.sale_id
    WHERE sale_id = ? 
    ORDER BY sale_id, product_id;`,
    [id],
  );

  return camelize(sale);
};

const addSaleDate = async () => {
  const newDate = new Date();
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUE (?)',
    [newDate],
  );

  return insertId;
};

const addNewSaleBd = async (products) => {
  const id = await addSaleDate();

  await Promise.all(products.map((product) => connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [id, product.productId, product.quantity],
  )));

  return id;
};

const findSaleById = async (saleId) => {
  const [[sale]] = await connection.execute(
    'SELECT id FROM sales WHERE id = ?',
    [saleId],
  );

  return camelize(sale);
};

const deleteSaleDb = async (id) => {
  await connection.execute(
    'DELETE FROM sales WHERE id = ?',
    [id],
  );

  return id;
};

const updateProductQuant = async (saleId, productId, quantity) => {
  const date = new Date();

  await connection.execute(
    `UPDATE sales_products SET quantity = ?
    WHERE sale_id = ? AND product_id = ?`,
    [quantity, saleId, productId],
  );

  const response = {
    date,
    productId: Number(productId),
    quantity,
    saleId: Number(saleId),
  };

  return response;
};

const findProdSale = async (saleId, productId) => {
  const [[sale]] = await connection.execute(
    'SELECT * FROM sales_products WHERE sale_id = ? AND product_id = ?',
    [saleId, productId],
  );

  return camelize(sale);
};

module.exports = {
  getAll,
  getById,
  addNewSaleBd,
  findSaleById,
  deleteSaleDb,
  updateProductQuant,
  findProdSale,
};