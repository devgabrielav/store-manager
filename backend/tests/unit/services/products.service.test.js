const { expect } = require('chai');
const Sinon = require('sinon');
const productsModel = require('../../../src/models/products.model');
const productsService = require('../../../src/services/products.service');
const { productMock, dbId, dbProductsMock } = require('../mocks/products.mocks');

describe('Realizando testes - PRODUCTS SERVICE:', function () {
  it('Retorna array vazio', async function () {
    Sinon.stub(productsModel, 'getAll').resolves([]);

    const { status, data } = await productsService.getAllProducts();

    expect(status).to.be.equal('SUCCESS');
    expect(data).to.deep.equal([]);
  });

  it('Retorna todos os produtos com sucesso', async function () {
    Sinon.stub(productsModel, 'getAll').resolves(dbProductsMock);

    const { status, data } = await productsService.getAllProducts();

    expect(status).to.be.equal('SUCCESS');
    expect(data).to.deep.equal(dbProductsMock);
  });

  it('Retorna NOT FOUND se buscar com id invalido', async function () {
    Sinon.stub(productsModel, 'getById').resolves();
    const { status, data } = await productsService.getProductById(10);

    expect(status).to.be.equal('NOT_FOUND');
    expect(data.message).to.deep.equal('Product not found');
  });

  it('Retorna produto com o id correspondente', async function () {
    Sinon.stub(productsModel, 'getById').resolves(productMock);

    const { status, data } = await productsService.getProductById(dbId);

    expect(status).to.be.equal('SUCCESS');
    expect(data).to.be.a('object');
    expect(data).to.deep.equal(productMock); 
  });

  afterEach(function () {
    Sinon.restore();
  });
});