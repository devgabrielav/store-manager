const chai = require('chai');
const chaiHttp = require('chai-http');
const Sinon = require('sinon');
const app = require('../../../src/app');
const { dbProductsMock } = require('../../unit/mocks/products.mocks');
const productsModel = require('../../../src/models/products.model');

chai.use(chaiHttp);
const { expect } = chai;

describe('Realizando testes - PRODUCTS ROUTES:', function () {
  it('Testando get na rota /products', async function () {
    const productsGetStub = Sinon.stub(productsModel, 'getAll').resolves(dbProductsMock);

    const response = await chai.request(app).get('/products');

    expect(productsGetStub.calledOnce).to.be.equal(true);
    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(dbProductsMock);
  });

  afterEach(function () {
    Sinon.restore();
  });
});