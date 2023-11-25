const { expect } = require('chai');
const Sinon = require('sinon');
const productsModel = require('../../../src/models/products.model');
const productsService = require('../../../src/services/products.service');
const { productMock, dbId, dbProductsMock,
  modifiedProductMock, responseProductQueryMock } = require('../mocks/products.mocks');

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

  it('Adiciona um produto com sucesso', async function () {
    Sinon.stub(productsModel, 'addProductDb').resolves(dbId);

    const inputData = 'Veste Black Widow';
    const { status, data } = await productsService.addProduct(inputData);
    
    expect(status).to.be.equal('CREATED');
    expect(data).to.be.a('object');
    expect(data).to.deep.equal(productMock);
  });

  it('Atualiza nome do produto corretamente', async function () {
    Sinon.stub(productsModel, 'updateProductDb').resolves(modifiedProductMock);

    const inputId = 4;
    const inputData = 'Black Widow Vest';
    const { status, data } = await productsService.updateProduct(inputId, inputData);

    expect(status).to.be.equal('SUCCESS');
    expect(data).to.be.a('object');
    expect(data).to.deep.equal(modifiedProductMock);
  });

  it('Deleta um produto com sucesso', async function () {
    Sinon.stub(productsModel, 'deleteProductDb').resolves(dbId);

    const { status } = await productsService.deleteProduct(dbId);

    expect(status).to.be.equal('DELETED');
  });

  it('Retorna SUCCESS e um array vazio', async function () {
    Sinon.stub(productsModel, 'getProductsByQuery').resolves([]);

    const { status, data } = await productsService.getProdsQuery('No products');

    expect(status).to.be.equal('SUCCESS');
    expect(data).to.be.a('array');
    expect(data).to.deep.equal([]);
  });

  it('Retorna todos os produtos e SUCCESS', async function () {
    Sinon.stub(productsModel, 'getAll').resolves(dbProductsMock);

    const { status, data } = await productsService.getProdsQuery('');

    expect(status).to.be.equal('SUCCESS');
    expect(data).to.be.a('array');
    expect(data).to.deep.equal(dbProductsMock);
  });

  it('Retorna os produtos com a respectiva query', async function () {
    Sinon.stub(productsModel, 'getProductsByQuery').resolves(responseProductQueryMock);

    const { status, data } = await productsService.getProdsQuery('infinito');

    expect(status).to.be.equal('SUCCESS');
    expect(data).to.be.a('array');
    expect(data).to.deep.equal(responseProductQueryMock);
  });

  afterEach(function () {
    Sinon.restore();
  });
});