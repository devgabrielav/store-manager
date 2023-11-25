const { expect } = require('chai');
const Sinon = require('sinon');
const salesModel = require('../../../src/models/sales.model');
const connection = require('../../../src/models/connection');
const { dbId, dbSalesMock, saleMock, newSalesMock, dateId,
  updateResponseMock,
  saleIdMock, productIdMock,
  findSaleMock } = require('../mocks/sales.mocks');

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

  it('Encontra uma venda por id', async function () {
    Sinon.stub(connection, 'execute').resolves([[{ id: 4 }]]);

    const foundSale = await salesModel.findSaleById(dbId);

    expect(foundSale).to.be.a('object');
    expect(foundSale).to.deep.equal({ id: 4 });
  });

  it('Deleta uma venda com sucesso', async function () {
    Sinon.stub(connection, 'execute').resolves([[{ id: 4 }]]);

    const deletedSale = await salesModel.deleteSaleDb(dbId);

    expect(deletedSale).to.be.a('number');
    expect(deletedSale).to.deep.equal(dbId);
  });

  it('Atualiza quantidade com sucesso', async function () {
    Sinon.useFakeTimers({
      now: Date.parse('2023-05-06T03:14:28.000Z'),
    });
    Sinon.stub(connection, 'execute').resolves(updateResponseMock);

    const updatedProduct = await salesModel.updateProductQuant(saleIdMock, productIdMock, 20);
    updatedProduct.date = updatedProduct.date.toISOString();
    
    expect(updatedProduct).to.be.a('object');
    expect(updatedProduct).to.deep.equal(updateResponseMock);
  });

  it('Encontra a venda com sucesso', async function () {
    Sinon.stub(connection, 'execute').resolves([[findSaleMock]]);

    const foundSale = await salesModel.findProdSale(saleIdMock, productIdMock);

    expect(foundSale).to.be.a('object');
    expect(foundSale).to.deep.equal(findSaleMock);
  });

  afterEach(function () {
    Sinon.restore();
  });
});