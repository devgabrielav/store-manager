const { expect } = require('chai');
const Sinon = require('sinon');
const salesModel = require('../../../src/models/sales.model');
const salesService = require('../../../src/services/sales.service');
const { dbId, dbSalesMock, saleMock, newSalesMock,
  newSalesReturnMock } = require('../mocks/sales.mocks');

describe('Realizando testes - SALES SERVICE:', function () {
  it('Retorna array vazio', async function () {
    Sinon.stub(salesModel, 'getAll').resolves([]);

    const { status, data } = await salesService.getAllSales();

    expect(status).to.be.equal('SUCCESS');
    expect(data).to.deep.equal([]);
  });

  it('Retorna todas as vendas com sucesso', async function () {
    Sinon.stub(salesModel, 'getAll').resolves(dbSalesMock);

    const { status, data } = await salesService.getAllSales();

    expect(status).to.be.equal('SUCCESS');
    expect(data).to.deep.equal(dbSalesMock);
  });

  it('Retorna NOT FOUND se buscar com id invalido', async function () {
    Sinon.stub(salesModel, 'getById').resolves();
    const { status, data } = await salesService.getSaleById(10);

    expect(status).to.be.equal('NOT_FOUND');
    expect(data.message).to.deep.equal('Sale not found');
  });

  it('Retorna venda com o id correspondente', async function () {
    Sinon.stub(salesModel, 'getById').resolves(saleMock);

    const { status, data } = await salesService.getSaleById(dbId);

    expect(status).to.be.equal('SUCCESS');
    expect(data).to.be.a('array');
    expect(data).to.deep.equal(saleMock); 
  });

  it('Adiciona novas vendas com sucesso', async function () {
    Sinon.stub(salesModel, 'addNewSaleBd').resolves(newSalesReturnMock);

    const { status, data } = await salesService.addNewSale(newSalesMock);

    expect(status).to.be.equal('CREATED');
    expect(data).to.be.an('object');
    expect(data).to.deep.equal(newSalesReturnMock);
  });

  afterEach(function () {
    Sinon.restore();
  });
});