const chai = require('chai');
const Sinon = require('sinon');
const sinonChai = require('sinon-chai');
const productsMiddleware = require('../../../src/middlewares/products.middlewares');
const productsModel = require('../../../src/models/products.model');
const { productMock } = require('../mocks/products.mocks');

chai.use(sinonChai);
const { expect } = chai;

describe('Realizando testes - PRODUCTS MIDDLEWARES:', function () {
  it('Testa o retorno sem o "name"', async function () {
    const next = Sinon.stub().returns();
    const req = {
      body: {},
    };
    const res = {};
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(res);

    productsMiddleware.nameValidation(req, res, next);

    expect(next).not.to.have.been.calledWith(); 
    expect(res.status.calledWith(400)).to.be.equal(true);
    expect(res.json.calledWith({ message: '"name" is required' })).to.be.equal(true);
  });

  it('Testa o retorno com o "name" com length menor que 5', async function () {
    const next = Sinon.stub().returns();
    const req = {
      body: {
        name: 'Fail',
      },
    };
    const res = {};
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(res);

    productsMiddleware.nameValidation(req, res, next);

    expect(next).not.to.have.been.calledWith(); 
    expect(res.status.calledWith(422)).to.be.equal(true);
    expect(res.json.calledWith({ message: '"name" length must be at least 5 characters long' })).to.be.equal(true);
  });

  it('Testa o next', function () {
    const next = Sinon.stub().returns();
    const req = {
      body: {
        name: 'Working',
      },
    };
    const res = {};
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(res);
    
    productsMiddleware.nameValidation(req, res, next);

    expect(next).to.have.been.calledWith(); 
  });

  it('Testa validateProductId', async function () {
    const next = Sinon.stub().returns();
    const req = {
      params: {
        id: 99,
      },
    };
    const res = {};
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(res);

    Sinon.stub(productsModel, 'getById').resolves(undefined);

    await productsMiddleware.validateProductId(req, res, next);

    expect(next).not.to.have.been.calledWith(); 
    expect(res.status.calledWith(404)).to.be.equal(true);
    expect(res.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
  });

  it('Testa o next de validateProductId', async function () {
    const next = Sinon.stub().returns();
    const req = {
      params: {
        id: 4,
      },
    };
    const res = {};
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(res);

    Sinon.stub(productsModel, 'getById').resolves(productMock);
    
    await productsMiddleware.validateProductId(req, res, next);

    expect(next).to.have.been.calledWith(); 
  });

  afterEach(function () {
    Sinon.restore();
  });
});