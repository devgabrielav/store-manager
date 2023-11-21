const { expect } = require('chai');
const Sinon = require('sinon');
const connection = require('../../../src/models/connection');
const productsModel = require('../../../src/models/products.model');
const { productMock, dbId, dbProductsMock } = require('../mocks/products.mocks');

describe('Realizando testes - PRODUCTS MODEL:', function () {
  it('Testa buscar todos os produtos', async function () {
    Sinon.stub(connection, 'execute').resolves([dbProductsMock]);

    const products = await productsModel.getAll();

    expect(products).to.be.an('array');
    expect(products).to.deep.equal(dbProductsMock);
  });

  it('Testa buscar um produto por id', async function () {
    Sinon.stub(connection, 'execute').resolves([[productMock]]);

    const product = await productsModel.getById(dbId);

    expect(product).to.be.a('object');
    expect(product).to.deep.equal(productMock);
  });

  afterEach(function () {
    Sinon.restore();
  });
});