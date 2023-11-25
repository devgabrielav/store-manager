const Sinon = require('sinon');
const { expect } = require('chai');
const productsService = require('../../../src/services/products.service');
const productsController = require('../../../src/controllers/products.controller');
const { productMock, dbProductsMock, modifiedProductMock } = require('../mocks/products.mocks');

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

  it('Deleta um produto com sucesso', async function () {
    Sinon.stub(productsService, 'deleteProduct').resolves({ status: 'DELETED' });

    const req = {
      params: {
        id: 4,
      },
    };
    const res = {};
    res.status = Sinon.stub().returns(res);
    res.end = Sinon.stub().returns(res);

    await productsController.deleteProductRoute(req, res);

    expect(res.status.calledWith(204)).to.be.equal(true);
    expect(res.end.calledWith()).to.be.equal(true);
  });

  it('Atualiza nome do produto com sucesso', async function () {
    Sinon.stub(productsService, 'updateProduct').resolves({ status: 'SUCCESS', data: modifiedProductMock });

    const req = {
      params: {
        id: 4,
      },
      body: {
        name: 'Black Widow Vest',
      },
    };
    const res = {};
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(res);

    await productsController.updateProductRoute(req, res);

    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith(modifiedProductMock)).to.be.equal(true);
  });

  it('Busca produtos por query com sucesso', async function () {
    Sinon.stub(productsService, 'getProdsQuery').resolves({ status: 'SUCCESS', data: dbProductsMock });
    const req = {
      query: {
        q: 'o',
      },
    };
    const res = {};
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(res);

    await productsController.getProductsQuery(req, res);

    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith(dbProductsMock)).to.be.equal(true);
  });

  afterEach(function () {
    Sinon.restore();
  });
});