import pactum from 'pactum';
import { StatusCodes } from 'http-status-codes';
import { faker } from '@faker-js/faker';
import { SimpleReporter } from '../simple-reporter';

describe('Mercado', () => {
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'https://api-desafio-qa.onrender.com';
  let mercadoId;

  const novoMercadoSchema = {
    $schema: 'http://json-schema.org/draft-04/schema#',
    type: 'object',
    properties: {
      message: {
        type: 'string'
      },
      novoMercado: {
        type: 'object',
        properties: {
          id: {
            type: 'integer'
          },
          nome: {
            type: 'string'
          },
          cnpj: {
            type: 'integer'
          },
          endereco: {
            type: 'string'
          },
          produtos: {
            type: 'object',
            properties: {
              hortifruit: {
                type: 'array',
                items: [
                  {
                    type: 'object',
                    properties: {
                      frutas: {
                        type: 'array',
                        items: {}
                      }
                    },
                    required: ['frutas']
                  },
                  {
                    type: 'object',
                    properties: {
                      legumes: {
                        type: 'array',
                        items: {}
                      }
                    },
                    required: ['legumes']
                  }
                ]
              },
              padaria: {
                type: 'array',
                items: [
                  {
                    type: 'object',
                    properties: {
                      doces: {
                        type: 'array',
                        items: {}
                      }
                    },
                    required: ['doces']
                  },
                  {
                    type: 'object',
                    properties: {
                      salgados: {
                        type: 'array',
                        items: {}
                      }
                    },
                    required: ['salgados']
                  }
                ]
              },
              acougue: {
                type: 'array',
                items: [
                  {
                    type: 'object',
                    properties: {
                      bovinos: {
                        type: 'array',
                        items: {}
                      }
                    },
                    required: ['bovinos']
                  },
                  {
                    type: 'object',
                    properties: {
                      suinos: {
                        type: 'array',
                        items: {}
                      }
                    },
                    required: ['suinos']
                  },
                  {
                    type: 'object',
                    properties: {
                      aves: {
                        type: 'array',
                        items: {}
                      }
                    },
                    required: ['aves']
                  }
                ]
              },
              peixaria: {
                type: 'array',
                items: [
                  {
                    type: 'object',
                    properties: {
                      peixes: {
                        type: 'array',
                        items: {}
                      }
                    },
                    required: ['peixes']
                  },
                  {
                    type: 'object',
                    properties: {
                      frutos_do_mar: {
                        type: 'array',
                        items: {}
                      }
                    },
                    required: ['frutos_do_mar']
                  }
                ]
              },
              frios: {
                type: 'array',
                items: [
                  {
                    type: 'object',
                    properties: {
                      queijos: {
                        type: 'array',
                        items: {}
                      }
                    },
                    required: ['queijos']
                  },
                  {
                    type: 'object',
                    properties: {
                      embutidos: {
                        type: 'array',
                        items: {}
                      }
                    },
                    required: ['embutidos']
                  },
                  {
                    type: 'object',
                    properties: {
                      outros: {
                        type: 'array',
                        items: {}
                      }
                    },
                    required: ['outros']
                  }
                ]
              },
              mercearia: {
                type: 'array',
                items: [
                  {
                    type: 'object',
                    properties: {
                      graos_cereais: {
                        type: 'array',
                        items: {}
                      }
                    },
                    required: ['graos_cereais']
                  },
                  {
                    type: 'object',
                    properties: {
                      massas: {
                        type: 'array',
                        items: {}
                      }
                    },
                    required: ['massas']
                  },
                  {
                    type: 'object',
                    properties: {
                      farinhas: {
                        type: 'array',
                        items: {}
                      }
                    },
                    required: ['farinhas']
                  },
                  {
                    type: 'object',
                    properties: {
                      conservados_enlatados: {
                        type: 'array',
                        items: {}
                      }
                    },
                    required: ['conservados_enlatados']
                  },
                  {
                    type: 'object',
                    properties: {
                      oleos: {
                        type: 'array',
                        items: {}
                      }
                    },
                    required: ['oleos']
                  },
                  {
                    type: 'object',
                    properties: {
                      temperos_condimentos: {
                        type: 'array',
                        items: {}
                      }
                    },
                    required: ['temperos_condimentos']
                  }
                ]
              },
              bebidas: {
                type: 'array',
                items: [
                  {
                    type: 'object',
                    properties: {
                      com_alcool: {
                        type: 'array',
                        items: {}
                      }
                    },
                    required: ['com_alcool']
                  },
                  {
                    type: 'object',
                    properties: {
                      sem_alcool: {
                        type: 'array',
                        items: {}
                      }
                    },
                    required: ['sem_alcool']
                  }
                ]
              },
              higienelimpeza: {
                type: 'array',
                items: [
                  {
                    type: 'object',
                    properties: {
                      higiene: {
                        type: 'array',
                        items: {}
                      }
                    },
                    required: ['higiene']
                  },
                  {
                    type: 'object',
                    properties: {
                      limpeza: {
                        type: 'array',
                        items: {}
                      }
                    },
                    required: ['limpeza']
                  }
                ]
              }
            },
            required: [
              'hortifruit',
              'padaria',
              'acougue',
              'peixaria',
              'frios',
              'mercearia',
              'bebidas',
              'higienelimpeza'
            ]
          }
        },
        required: ['id', 'nome', 'cnpj', 'endereco', 'produtos']
      }
    },
    required: ['message', 'novoMercado']
  };

  p.request.setDefaultTimeout(90000);

  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());

  beforeEach(async () => {
    mercadoId = await p
      .spec()
      .post(`${baseUrl}/mercado`)
      .withJson({
        nome: faker.company.name(),
        endereco: faker.location.streetAddress(),
        cnpj: faker.number.int({ min: 10000000000000, max: 99999999999999 })
      })
      .expectStatus(StatusCodes.CREATED)
      .returns('novoMercado.id');
  });

  it('Deve criar mercado', async () => {
    mercadoId = await p
      .spec()
      .post(`${baseUrl}/mercado`)
      .withJson({
        nome: faker.company.name(),
        endereco: faker.location.streetAddress(),
        cnpj: faker.number.int({ min: 10000000000000, max: 99999999999999 })
      })
      .expectStatus(StatusCodes.CREATED)
      .expectJsonSchema(novoMercadoSchema)
      .returns('novoMercado.id');
  });

  it('Não deve criar mercado pois cnpj é menor que 14 digitos', async () => {
    await p
      .spec()
      .post(`${baseUrl}/mercado`)
      .withJson({
        nome: faker.company.name(),
        endereco: faker.location.streetAddress(),
        cnpj: faker.number.int({ min: 1000000000000, max: 9999999999999 })
      })
      .expectStatus(StatusCodes.BAD_REQUEST)
      .expectBodyContains('CNPJ deve ter 14 dígitos');
  });

  it('Não deve criar mercado pois o nome é obrigatório', async () => {
    await p
      .spec()
      .post(`${baseUrl}/mercado`)
      .withJson({
        endereco: faker.location.streetAddress(),
        cnpj: faker.number.int({ min: 10000000000000, max: 99999999999999 })
      })
      .expectStatus(StatusCodes.BAD_REQUEST)
      .expectBodyContains('Nome é obrigatório');
  });

  it('Não deve criar mercado pois o endereco é obrigatório', async () => {
    await p
      .spec()
      .post(`${baseUrl}/mercado`)
      .withJson({
        nome: faker.company.name(),
        cnpj: faker.number.int({ min: 10000000000000, max: 99999999999999 })
      })
      .expectStatus(StatusCodes.BAD_REQUEST)
      .expectBodyContains('Endereço é obrigatório');
  });

  it('Não deve criar mercado pois o cnpj é obrigatório', async () => {
    await p
      .spec()
      .post(`${baseUrl}/mercado`)
      .withJson({
        nome: faker.company.name(),
        endereco: faker.location.streetAddress()
      })
      .expectStatus(StatusCodes.BAD_REQUEST)
      .expectBodyContains('CNPJ é obrigatório');
  });

  it('Não deve criar mercado pois o registro já existe', async () => {
    const nome = faker.company.name();
    const endereco = faker.location.streetAddress();
    const cnpj = faker.number.int({ min: 10000000000000, max: 99999999999999 });

    await p
      .spec()
      .post(`${baseUrl}/mercado`)
      .withJson({
        nome,
        endereco,
        cnpj
      })
      .expectStatus(StatusCodes.CREATED);

    await p
      .spec()
      .post(`${baseUrl}/mercado`)
      .withJson({
        nome,
        endereco,
        cnpj
      })
      .expectStatus(StatusCodes.BAD_REQUEST)
      .expectBodyContains(`O nome ${nome} já existe na lista de Mercados.`);
  });

  it('Deve buscar o mercado', async () => {
    await p
      .spec()
      .get(`${baseUrl}/mercado/${mercadoId}`)
      .expectStatus(StatusCodes.OK)
      .expectJsonSchema({
        $schema: 'http://json-schema.org/draft-04/schema#',
        type: 'object',
        properties: {
          cnpj: {
            type: 'string'
          },
          endereco: {
            type: 'string'
          },
          id: {
            type: 'integer'
          },
          nome: {
            type: 'string'
          }
        },
        required: ['cnpj', 'endereco', 'id', 'nome']
      });
  });

  it('Deve alterar o mercado', async () => {
    await p
      .spec()
      .put(`${baseUrl}/mercado/${mercadoId}`)
      .withJson({
        nome: faker.company.name(),
        endereco: faker.location.streetAddress(),
        cnpj: faker.number.int({ min: 10000000000000, max: 99999999999999 })
      })
      .expectStatus(StatusCodes.OK)
      .expectJsonSchema({
        $schema: 'http://json-schema.org/draft-04/schema#',
        type: 'object',
        properties: {
          message: {
            type: 'string'
          },
          updatedMercado: {
            type: 'object',
            properties: {
              cnpj: {
                type: 'string'
              },
              endereco: {
                type: 'string'
              },
              id: {
                type: 'integer'
              },
              nome: {
                type: 'string'
              }
            },
            required: ['cnpj', 'endereco', 'id', 'nome']
          }
        },
        required: ['message', 'updatedMercado']
      });
  });

  it('Deve deletar o mercado', async () => {
    await p
      .spec()
      .get(`${baseUrl}/mercado`)
      .expectStatus(StatusCodes.OK)
      .expectJsonSchema({
        $schema: 'http://json-schema.org/draft-04/schema#',
        type: 'object',
        properties: {
          message: {
            type: 'string'
          }
        },
        required: ['message']
      });
  });
});
import pactum from 'pactum';
import { StatusCodes } from 'http-status-codes';
import { faker } from '@faker-js/faker';
import { SimpleReporter } from '../simple-reporter';

describe('Testes de API para Mercados', () => {
  const tester = pactum;
  const reporter = SimpleReporter;
  const API_URL = 'https://api-desafio-qa.onrender.com';
  let idMercadoCriado;

  // Esquema de validação simplificado
  const mercadoSchema = {
    $schema: 'http://json-schema.org/draft-04/schema#',
    type: 'object',
    properties: {
      message: { type: 'string' },
      novoMercado: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          nome: { type: 'string' },
          cnpj: { type: 'integer' },
          endereco: { type: 'string' },
          produtos: { type: 'object' }
        },
        required: ['id', 'nome', 'cnpj', 'endereco', 'produtos']
      }
    },
    required: ['message', 'novoMercado']
  };

  // Configurações iniciais
  tester.request.setDefaultTimeout(90000);

  beforeAll(() => tester.reporter.add(reporter));
  afterAll(() => tester.reporter.end());

  // Pré-criação de mercado para testes
  beforeEach(async () => {
    idMercadoCriado = await criarMercado();
  });

  // Funções auxiliares
  const criarMercado = async () => {
    return await tester
      .spec()
      .post(`${API_URL}/mercado`)
      .withJson(gerarDadosMercado())
      .expectStatus(StatusCodes.CREATED)
      .returns('novoMercado.id');
  };

  const gerarDadosMercado = () => ({
    nome: faker.company.name(),
    endereco: faker.location.streetAddress(),
    cnpj: faker.number.int({ min: 10000000000000, max: 99999999999999 })
  });

  // Testes
  describe('Criação de Mercado', () => {
    it('deve criar novo mercado com dados válidos', async () => {
      await tester
        .spec()
        .post(`${API_URL}/mercado`)
        .withJson(gerarDadosMercado())
        .expectStatus(StatusCodes.CREATED)
        .expectJsonSchema(mercadoSchema);
    });

    it('não deve criar mercado com CNPJ inválido (menos de 14 dígitos)', async () => {
      const dadosInvalidos = {
        ...gerarDadosMercado(),
        cnpj: faker.number.int({ min: 1000000000000, max: 9999999999999 })
      };

      await tester
        .spec()
        .post(`${API_URL}/mercado`)
        .withJson(dadosInvalidos)
        .expectStatus(StatusCodes.BAD_REQUEST)
        .expectBodyContains('CNPJ deve ter 14 dígitos');
    });

    it('não deve criar mercado sem nome', async () => {
      const { nome, ...dadosSemNome } = gerarDadosMercado();

      await tester
        .spec()
        .post(`${API_URL}/mercado`)
        .withJson(dadosSemNome)
        .expectStatus(StatusCodes.BAD_REQUEST)
        .expectBodyContains('Nome é obrigatório');
    });

    it('não deve criar mercado sem endereço', async () => {
      const { endereco, ...dadosSemEndereco } = gerarDadosMercado();

      await tester
        .spec()
        .post(`${API_URL}/mercado`)
        .withJson(dadosSemEndereco)
        .expectStatus(StatusCodes.BAD_REQUEST)
        .expectBodyContains('Endereço é obrigatório');
    });

    it('não deve criar mercado sem CNPJ', async () => {
      const { cnpj, ...dadosSemCNPJ } = gerarDadosMercado();

      await tester
        .spec()
        .post(`${API_URL}/mercado`)
        .withJson(dadosSemCNPJ)
        .expectStatus(StatusCodes.BAD_REQUEST)
        .expectBodyContains('CNPJ é obrigatório');
    });

    it('não deve criar mercado com dados duplicados', async () => {
      const dadosMercado = gerarDadosMercado();

      await criarMercadoComDados(dadosMercado);

      await tester
        .spec()
        .post(`${API_URL}/mercado`)
        .withJson(dadosMercado)
        .expectStatus(StatusCodes.BAD_REQUEST)
        .expectBodyContains(`O nome ${dadosMercado.nome} já existe`);
    });
  });

  describe('Operações com Mercado Existente', () => {
    it('deve recuperar informações do mercado', async () => {
      await tester
        .spec()
        .get(`${API_URL}/mercado/${idMercadoCriado}`)
        .expectStatus(StatusCodes.OK)
        .expectJsonMatch({
          id: idMercadoCriado,
          nome: String,
          endereco: String,
          cnpj: String
        });
    });

    it('deve atualizar dados do mercado', async () => {
      await tester
        .spec()
        .put(`${API_URL}/mercado/${idMercadoCriado}`)
        .withJson(gerarDadosMercado())
        .expectStatus(StatusCodes.OK)
        .expectJsonMatch({
          message: String,
          updatedMercado: {
            id: idMercadoCriado,
            nome: String,
            endereco: String,
            cnpj: String
          }
        });
    });

    it('deve listar todos os mercados', async () => {
      await tester
        .spec()
        .get(`${API_URL}/mercado`)
        .expectStatus(StatusCodes.OK)
        .expectJsonMatch({
          message: String
        });
    });
  });

  // Função auxiliar adicional
  const criarMercadoComDados = async dados => {
    return await tester
      .spec()
      .post(`${API_URL}/mercado`)
      .withJson(dados)
      .expectStatus(StatusCodes.CREATED);
  };
});
