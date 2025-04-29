import pactum from 'pactum';
import { StatusCodes } from 'http-status-codes';
import { faker } from '@faker-js/faker';
import { SimpleReporter } from '../simple-reporter';

describe('Testes API Mercado', () => {
  const request = pactum;
  const apiUrl = 'https://api-desafio-qa.onrender.com';
  let mercadoId;

  request.request.setDefaultTimeout(90000);

  beforeAll(() => request.reporter.add(SimpleReporter));
  afterAll(() => request.reporter.end());

  beforeEach(async () => {
    mercadoId = await request
      .spec()
      .post(`${apiUrl}/mercado`)
      .withJson({
        nome: faker.company.name(),
        endereco: faker.location.streetAddress(),
        cnpj: faker.number.int({ min: 10000000000000, max: 99999999999999 })
      })
      .expectStatus(StatusCodes.CREATED)
      .returns('novoMercado.id');
  });

  it('Criar mercado com sucesso', async () => {
    await request
      .spec()
      .post(`${apiUrl}/mercado`)
      .withJson({
        nome: faker.company.name(),
        endereco: faker.location.streetAddress(),
        cnpj: faker.number.int({ min: 10000000000000, max: 99999999999999 })
      })
      .expectStatus(StatusCodes.CREATED)
      .expectJsonMatch({
        message: String,
        novoMercado: {
          id: Number,
          nome: String,
          cnpj: Number,
          endereco: String,
          produtos: Object
        }
      });
  });

  it('Erro ao criar mercado com CNPJ menor que 14 digitos', async () => {
    await request
      .spec()
      .post(`${apiUrl}/mercado`)
      .withJson({
        nome: faker.company.name(),
        endereco: faker.location.streetAddress(),
        cnpj: faker.number.int({ min: 1000000000000, max: 9999999999999 })
      })
      .expectStatus(StatusCodes.BAD_REQUEST)
      .expectBodyContains('CNPJ deve ter 14 dígitos');
  });

  it('Erro ao criar mercado sem nome', async () => {
    await request
      .spec()
      .post(`${apiUrl}/mercado`)
      .withJson({
        endereco: faker.location.streetAddress(),
        cnpj: faker.number.int({ min: 10000000000000, max: 99999999999999 })
      })
      .expectStatus(StatusCodes.BAD_REQUEST)
      .expectBodyContains('Nome é obrigatório');
  });

  it('Erro ao criar mercado sem endereco', async () => {
    await request
      .spec()
      .post(`${apiUrl}/mercado`)
      .withJson({
        nome: faker.company.name(),
        cnpj: faker.number.int({ min: 10000000000000, max: 99999999999999 })
      })
      .expectStatus(StatusCodes.BAD_REQUEST)
      .expectBodyContains('Endereço é obrigatório');
  });

  it('Erro ao criar mercado sem CNPJ', async () => {
    await request
      .spec()
      .post(`${apiUrl}/mercado`)
      .withJson({
        nome: faker.company.name(),
        endereco: faker.location.streetAddress()
      })
      .expectStatus(StatusCodes.BAD_REQUEST)
      .expectBodyContains('CNPJ é obrigatório');
  });

  it('Erro ao criar mercado duplicado', async () => {
    const dadosMercado = {
      nome: faker.company.name(),
      endereco: faker.location.streetAddress(),
      cnpj: faker.number.int({ min: 10000000000000, max: 99999999999999 })
    };

    await request
      .spec()
      .post(`${apiUrl}/mercado`)
      .withJson(dadosMercado)
      .expectStatus(StatusCodes.CREATED);

    await request
      .spec()
      .post(`${apiUrl}/mercado`)
      .withJson(dadosMercado)
      .expectStatus(StatusCodes.BAD_REQUEST)
      .expectBodyContains(`O nome ${dadosMercado.nome} já existe`);
  });

  it('Buscar mercado por ID', async () => {
    await request
      .spec()
      .get(`${apiUrl}/mercado/${mercadoId}`)
      .expectStatus(StatusCodes.OK)
      .expectJsonMatch({
        id: mercadoId,
        nome: String,
        endereco: String,
        cnpj: String
      });
  });

  it('Erro ao buscar mercado com ID inexistente', async () => {
    const idInexistente = 999999;
    await request
      .spec()
      .get(`${apiUrl}/mercado/${idInexistente}`)
      .expectStatus(StatusCodes.NOT_FOUND)
      .expectBodyContains('Mercado não encontrado');
  });

  it('Atualizar mercado', async () => {
    await request
      .spec()
      .put(`${apiUrl}/mercado/${mercadoId}`)
      .withJson({
        nome: faker.company.name(),
        endereco: faker.location.streetAddress(),
        cnpj: faker.number.int({ min: 10000000000000, max: 99999999999999 })
      })
      .expectStatus(StatusCodes.OK)
      .expectJsonMatch({
        message: String,
        updatedMercado: {
          id: mercadoId,
          nome: String,
          endereco: String,
          cnpj: String
        }
      });
  });

  it('Erro ao atualizar mercado com CNPJ inválido', async () => {
    await request
      .spec()
      .put(`${apiUrl}/mercado/${mercadoId}`)
      .withJson({
        nome: faker.company.name(),
        endereco: faker.location.streetAddress(),
        cnpj: faker.number.int({ min: 1000000000000, max: 9999999999999 })
      })
      .expectStatus(StatusCodes.BAD_REQUEST)
      .expectBodyContains('CNPJ deve ter 14 dígitos');
  });

  it('Erro ao atualizar mercado sem nome', async () => {
    await request
      .spec()
      .put(`${apiUrl}/mercado/${mercadoId}`)
      .withJson({
        endereco: faker.location.streetAddress(),
        cnpj: faker.number.int({ min: 10000000000000, max: 99999999999999 })
      })
      .expectStatus(StatusCodes.BAD_REQUEST)
      .expectBodyContains('Nome é obrigatório');
  });

  it('Listar todos mercados', async () => {
    await request
      .spec()
      .get(`${apiUrl}/mercado`)
      .expectStatus(StatusCodes.OK)
      .expectJsonMatch({
        message: String
      });
  });
});
