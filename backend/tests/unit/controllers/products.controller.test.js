const Sinon = require('sinon');
const { expect } = require('chai');
const productsService = require('../../../src/services/products.service');
const productsController = require('../../../src/controllers/products.controller');
const { productMock, dbProductsMock } = require('../mocks/products.mocks');

describe('Realizando testes - PRODUCTS CONTROLLER:', function () {
  it('Busca todos os produtos na rota /products', async function () {
    Sinon.stub(productsService, 'getAllProducts').resolves({ status: 'SUCCESS', data: dbProductsMock });

    const req = {};
    const res = {};
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(res);

    await productsController.getAllProductsRoute(req, res);
    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith(dbProductsMock)).to.be.equal(true);
  });

  it('Busca um produto na rota /products/id', async function () {
    Sinon.stub(productsService, 'getProductById').resolves({ status: 'SUCCESS', data: productMock });

    const req = {
      params: {
        id: 2,
      },
    };
    const res = {};
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(res);

    await productsController.getProductByIdRoute(req, res);
    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith(productMock)).to.be.equal(true);
  });

  it('Busca com id invalido e traz NOT_FOUND', async function () {
    Sinon.stub(productsService, 'getProductById').resolves({ status: 'NOT_FOUND', data: { message: 'Product not found' } });

    const req = {
      params: {
        id: 55,
      },
    };
    const res = {};
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(res);

    await productsController.getProductByIdRoute(req, res);
    expect(res.status.calledWith(404)).to.be.equal(true);
    expect(res.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
  });

  it('Adiciona novo produto', async function () {
    Sinon.stub(productsService, 'addProduct').resolves({ status: 'CREATED', data: productMock });
    
    const req = {
      body: {
        name: 'Veste Black Widow',
      },
    };
    const res = {};
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(res);

    await productsController.addProductRoute(req, res);

    expect(res.status.calledWith(201)).to.be.equal(true);
    expect(res.json.calledWith(productMock)).to.be.equal(true);
  });

  afterEach(function () {
    Sinon.restore();
  });
});