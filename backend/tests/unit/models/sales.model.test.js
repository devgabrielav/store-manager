const { expect } = require('chai');
const Sinon = require('sinon');
const salesModel = require('../../../src/models/sales.model');
const connection = require('../../../src/models/connection');
const { dbId, dbSalesMock, saleMock, newSalesMock, dateId } = require('../mocks/sales.mocks');

describe('Realizando testes - SALES MODEL:', function () {
  it('Testa buscar todas as vendas', async function () {
    Sinon.stub(connection, 'execute').resolves([dbSalesMock]);

    const sales = await salesModel.getAll();

    expect(sales).to.be.an('array');
    expect(sales).to.deep.equal(dbSalesMock);
  });

  it('Testa buscar uma venda por id', async function () {
    Sinon.stub(connection, 'execute').resolves([[saleMock]]);

    const sale = await salesModel.getById(dbId);

    expect(sale).to.be.a('array');
    expect(sale).to.deep.equal([saleMock]);
  });

  it('Adiciona novas vendas', async function () {
    Sinon.stub(connection, 'execute').resolves([dateId]);

    const newSaleId = await salesModel.addNewSaleBd(newSalesMock);

    expect(newSaleId).to.be.a('number');
    expect(newSaleId).to.deep.equal(dbId);
  });

  afterEach(function () {
    Sinon.restore();
  });
});