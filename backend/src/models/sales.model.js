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

module.exports = {
  getAll,
  getById,
};