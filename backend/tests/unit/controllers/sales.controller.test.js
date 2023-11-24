const Sinon = require('sinon');
const { expect } = require('chai');
const salesService = require('../../../src/services/sales.service');
const salesController = require('../../../src/controllers/sales.controller');
const { saleMock, dbSalesMock, newSalesMock, newSalesReturnMock, dbId } = require('../mocks/sales.mocks');

describe('Realizando testes - SALES CONTROLLER:', function () {
  it('Busca todas as vendas na rota /sales', async function () {
    Sinon.stub(salesService, 'getAllSales').resolves({ status: 'SUCCESS', data: dbSalesMock });

    const req = {};
    const res = {};
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(res);

    await salesController.getAllSalesRoute(req, res);
    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith(dbSalesMock)).to.be.equal(true);
  });

  it('Busca uma venda na rota /sales/id', async function () {
    Sinon.stub(salesService, 'getSaleById').resolves({ status: 'SUCCESS', data: saleMock });

    const req = {
      params: {
        id: 2,
      },
    };
    const res = {};
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(res);

    await salesController.getSaleByIdRoute(req, res);
    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith(saleMock)).to.be.equal(true);
  });

  it('Busca com id invalido e traz NOT_FOUND', async function () {
    Sinon.stub(salesService, 'getSaleById').resolves({ status: 'NOT_FOUND', data: { message: 'Sale not found' } });

    const req = {
      params: {
        id: 55,
      },
    };
    const res = {};
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(res);

    await salesController.getSaleByIdRoute(req, res);
    expect(res.status.calledWith(404)).to.be.equal(true);
    expect(res.json.calledWith({ message: 'Sale not found' })).to.be.equal(true);
  });

  it('Adiciona novas vendas e retorna 201', async function () {
    Sinon.stub(salesService, 'addNewSale').resolves({ status: 'CREATED', data: dbId });

    const req = {
      body: newSalesMock,
    };
    const res = {};
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(res);

    await salesController.addNewSale(req, res);
    expect(res.status.calledWith(201)).to.be.equal(true);
    expect(res.json.calledWith(newSalesReturnMock)).to.be.equal(true);
  });

  it('Deleta uma venda com sucesso', async function () {
    Sinon.stub(salesService, 'deleteSale').resolves({ status: 'DELETED' });

    const req = {
      params: {
        id: 4,
      },
    };
    const res = {};
    res.status = Sinon.stub().returns(res);
    res.end = Sinon.stub().returns(res);

    await salesController.deleteSaleRoute(req, res);

    expect(res.status.calledWith(204)).to.be.equal(true);
    expect(res.end.calledWith()).to.be.equal(true);
  });

  afterEach(function () {
    Sinon.restore();
  });
});