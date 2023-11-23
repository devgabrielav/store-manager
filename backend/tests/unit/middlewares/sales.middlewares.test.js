const chai = require('chai');
const Sinon = require('sinon');
const sinonChai = require('sinon-chai');
const salesMiddleware = require('../../../src/middlewares/sales.middlewares');

chai.use(sinonChai);
const { expect } = chai;

describe('Realizando testes - SALES MIDDLEWARES:', function () {
  it('Testa o retorno sem a chave "productId"', async function () {
    const next = Sinon.stub().returns();
    const req = {
      body: [
        {
          quantity: 1,
        },
      ],
    };
    const res = {};
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(res);

    salesMiddleware.keysExist(req, res, next);

    expect(next).not.to.have.been.calledWith(); 
    expect(res.status.calledWith(400)).to.be.equal(true);
    expect(res.json.calledWith({ message: '"productId" is required' })).to.be.equal(true);
  });

  it('Testa o retorno sem a chave "quantity"', async function () {
    const next = Sinon.stub().returns();
    const req = {
      body: [
        {
          productId: 1,
        },
      ],
    };
    const res = {};
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(res);

    salesMiddleware.keysExist(req, res, next);

    expect(next).not.to.have.been.calledWith(); 
    expect(res.status.calledWith(400)).to.be.equal(true);
    expect(res.json.calledWith({ message: '"quantity" is required' })).to.be.equal(true);
  });

  it('Testa o next do keysExist', async function () {
    const next = Sinon.stub().returns();
    const req = {
      body: 
        [
          {
            productId: 1,
            quantity: 1,
          },
        ],
    };
    const res = {};
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(res);
    
    salesMiddleware.keysExist(req, res, next);

    expect(next).to.have.been.calledWith(); 
  });

  it('Testa o valor incorreto de "quantity"', async function () {
    const next = Sinon.stub().returns();
    const req = {
      body: 
        [
          {
            productId: 1,
            quantity: 0,
          },
        ],
    };
    const res = {};
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(res);

    salesMiddleware.quantityValidate(req, res, next);

    expect(next).not.to.have.been.calledWith(); 
    expect(res.status.calledWith(422)).to.be.equal(true);
    expect(res.json.calledWith({ message: '"quantity" must be greater than or equal to 1' })).to.be.equal(true);
  });

  it('Testa o next do quantityValidate', async function () {
    const next = Sinon.stub().returns();
    const req = {
      body: 
        [
          {
            productId: 1,
            quantity: 1,
          },
        ],
    };
    const res = {};
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(res);
    
    salesMiddleware.quantityValidate(req, res, next);

    expect(next).to.have.been.calledWith(); 
  });

  afterEach(function () {
    Sinon.restore();
  });
});