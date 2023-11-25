const dbSalesMock = [
  {
    saleId: 1,
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2,
  },
  {
    saleId: 1,
    date: '2021-09-09T04:54:54.000Z',
    productId: 2,
    quantity: 2,
  },
];

const saleMock = [
  {
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2,
  },
];

const newSalesMock = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const newSalesReturnMock = {
  id: 4,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ],
};

const updateResponseMock = {
  date: '2023-05-06T03:14:28.000Z',
  productId: 2,
  quantity: 20,
  saleId: 1,
};

const updateQuantityMock = {
  quantity: 20,
};

const saleIdMock = 1;

const productIdMock = 2;

const dbId = 4;

const dateId = { insertId: 4 };

const findSaleMock = {
  saleId: 1,
  productId: 2,
  quantity: 10,
};
const saleFound = [{
  id: 1,
  date: '2023-05-06T03:14:28.000Z',
}];

const newSaleMock = [{
  productId: 1,
  quantity: 1,
}];

module.exports = {
  dbSalesMock,
  saleMock,
  dbId,
  newSalesMock,
  newSalesReturnMock,
  dateId,
  updateResponseMock,
  updateQuantityMock,
  saleIdMock,
  productIdMock,
  findSaleMock,
  newSaleMock,
  saleFound,
};