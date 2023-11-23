const chai = require('chai');
const Sinon = require('sinon');
const sinonChai = require('sinon-chai');
const productsMiddleware = require('../../../src/middlewares/products.middlewares');

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

  it('Testa o next', async function () {
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

  afterEach(function () {
    Sinon.restore();
  });
});