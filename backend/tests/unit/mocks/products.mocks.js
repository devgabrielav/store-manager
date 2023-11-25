const dbProductsMock = [
  {
    id: 1,
    name: 'Projetor Spider Web',
  },
  {
    id: 2,
    name: 'Veste Black Widow',
  },
  {
    id: 3,
    name: 'Joia do infinito',
  },
];

const responseProductQueryMock = [
  {
    id: 3,
    name: 'Joia do infinito',
  },
];

const productMock = {
  id: 4,
  name: 'Veste Black Widow',
};

const modifiedProductMock = {
  id: 4,
  name: 'Black Widow Vest',
};

const dbId = 4;

const dbInsertId = { insertId: 4 };

module.exports = {
  dbProductsMock,
  dbId,
  productMock,
  dbInsertId,
  modifiedProductMock,
  responseProductQueryMock,
};