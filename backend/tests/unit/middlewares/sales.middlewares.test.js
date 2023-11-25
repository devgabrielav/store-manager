const chai = require('chai');
const Sinon = require('sinon');
const sinonChai = require('sinon-chai');
const salesMiddleware = require('../../../src/middlewares/sales.middlewares');
const productsModel = require('../../../src/models/products.model');
const salesModel = require('../../../src/models/sales.model');
const { newSaleMock, findSaleMock, saleFound } = require('../mocks/sales.mocks');

const { expect } = chai;
chai.use(sinonChai);

describe('Realizando testes - SALES MIDDLEWARES:', function () {
  it('Testa o retorno sem a chave "productId"', async function () {
    const next = Sinon.stub().returns();
    const req = { body: [{ quantity: 1 }] };
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
    const req = { body: [{ productId: 1 }] };
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
    const req = { body: [{ productId: 1, quantity: 1 }] };
    const res = {};
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(res);
    
    salesMiddleware.keysExist(req, res, next);

    expect(next).to.have.been.calledWith(); 
  });

  it('Testa o valor incorreto de "quantity"', async function () {
    const next = Sinon.stub().returns();
    const req = { body: [{ productId: 1, quantity: 0 }] };
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
    const req = { body: [{ productId: 1, quantity: 1 }] };
    const res = {};
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(res);
    
    salesMiddleware.quantityValidate(req, res, next);

    expect(next).to.have.been.calledWith(); 
  });

  it('Testa next productIdExists', async function () {
    const next = Sinon.stub().returns();
    const req = { body: newSaleMock };
    const res = {};
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(res);

    Sinon.stub(productsModel, 'getById').resolves({ id: 1, name: 'Spider Web' });  

    await salesMiddleware.productIdExists(req, res, next);

    expect(next).to.have.been.calledWith(); 
  });

  it('Testa product not found productIdExists', async function () {
    const next = Sinon.stub().returns();
    const req = { body: [{ productId: 99, quantity: 1 }] };
    const res = {};
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(res);

    Sinon.stub(productsModel, 'getById').resolves(undefined);

    await salesMiddleware.productIdExists(req, res, next);

    expect(next).not.to.have.been.calledWith(); 
    expect(res.status.calledWith(404)).to.be.equal(true);
    expect(res.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
  });

  it('Testa sale not found do saleExists', async function () {
    const next = Sinon.stub().returns();
    const req = { params: { id: 99 } };
    const res = {};
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(res);

    Sinon.stub(salesModel, 'findSaleById').resolves(undefined);

    await salesMiddleware.saleExists(req, res, next);

    expect(next).not.to.have.been.calledWith(); 
    expect(res.status.calledWith(404)).to.be.equal(true);
    expect(res.json.calledWith({ message: 'Sale not found' })).to.be.equal(true);
  });

  it('Testa o next do saleExists', async function () {
    const next = Sinon.stub().returns();
    const req = { params: { id: 4 } };
    const res = {};
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(res);

    Sinon.stub(salesModel, 'findSaleById').resolves({ id: 4 });

    await salesMiddleware.saleExists(req, res, next);

    expect(next).to.have.been.calledWith(); 
  });

  it('Testa sem quantity required de quantityExistsAndIsValid', async function () {
    const next = Sinon.stub().returns();
    const req = { body: { } };
    const res = {};
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(res);

    await salesMiddleware.quantityExistsAndIsValid(req, res, next);

    expect(next).not.to.have.been.calledWith(); 
    expect(res.status.calledWith(400)).to.be.equal(true);
    expect(res.json.calledWith({ message: '"quantity" is required' })).to.be.equal(true);
  });

  it('Testa quantity required de quantityExistsAndIsValid menor que 1', async function () {
    const next = Sinon.stub().returns();
    const req = { body: { quantity: 0 } };
    const res = {};
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(res);

    await salesMiddleware.quantityExistsAndIsValid(req, res, next);

    expect(next).not.to.have.been.calledWith(); 
    expect(res.status.calledWith(422)).to.be.equal(true);
    expect(res.json.calledWith({ message: '"quantity" must be greater than or equal to 1' })).to.be.equal(true);
  });

  it('Testa o next de quantityExistsAndIsValid', async function () {
    const next = Sinon.stub().returns();
    const req = { body: { quantity: 5 } };
    const res = {};
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(res);

    await salesMiddleware.quantityExistsAndIsValid(req, res, next);

    expect(next).to.have.been.calledWith(); 
  });

  it('Testa sale undefined de productAndSaleExists', async function () {
    const next = Sinon.stub().returns();
    const req = { params: { saleId: 0, productId: 1 } };
    const res = {};
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(res);

    Sinon.stub(salesModel, 'findSaleById').resolves(undefined);

    await salesMiddleware.productAndSaleExists(req, res, next);

    expect(next).not.to.have.been.calledWith(); 
    expect(res.status.calledWith(404)).to.be.equal(true);
    expect(res.json.calledWith({ message: 'Sale not found' })).to.be.equal(true);
  });

  it('Testa product not found de productAndSaleExists', async function () {
    const next = Sinon.stub().returns();
    const req = { params: { saleId: 1, productId: 5 } };
    const res = {};
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(res);

    Sinon.stub(salesModel, 'findSaleById').resolves(saleFound);
    Sinon.stub(salesModel, 'findProdSale').resolves(undefined);

    await salesMiddleware.productAndSaleExists(req, res, next);

    expect(next).not.to.have.been.calledWith(); 
    expect(res.status.calledWith(404)).to.be.equal(true);
    expect(res.json.calledWith({ message: 'Product not found in sale' })).to.be.equal(true);
  });

  it('Testa next de productAndSaleExists', async function () {
    const next = Sinon.stub().returns();
    const req = { params: { saleId: 1, productId: 2 } };
    const res = {};
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(res);

    Sinon.stub(salesModel, 'findSaleById').resolves(saleFound);
    Sinon.stub(salesModel, 'findProdSale').resolves(findSaleMock);

    await salesMiddleware.productAndSaleExists(req, res, next);

    expect(next).to.have.been.calledWith(); 
  });
  afterEach(function () {
    Sinon.restore();
  });
});