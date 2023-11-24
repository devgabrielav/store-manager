const camelize = require('camelize');
const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products ORDER BY id;',
  );

  return camelize(products);
};

const getById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?;',
    [id],
  );

  return camelize(product);
};

const addProductDb = async (productName) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUE (?)',
    [productName],
  );

  return insertId;
};

const updateProductDb = async (id, productName) => {
  await connection.execute(
    'UPDATE products SET name = ? WHERE id = ?',
    [productName, Number(id)],
  );

  return {
    id: Number(id),
    name: productName,
  };
};

const deleteProductDb = async (id) => {
  await connection.execute(
    'DELETE FROM products WHERE id = ?',
    [id],
  );

  return id;
};

module.exports = {
  getAll,
  getById,
  addProductDb,
  updateProductDb,
  deleteProductDb,
};