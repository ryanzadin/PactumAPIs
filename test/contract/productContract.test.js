const { reporter, flow, handler, mock, request } = require('pactum');
const pf = require('pactum-flow-plugin');
request.setBaseUrl('http://lojaebac.ebaconline.art.br')

function addFlowReporter() {
  pf.config.url = 'http://localhost:8081'; // pactum flow server url
  pf.config.projectId = 'lojaebac-api';
  pf.config.projectName = 'teste de estoque front';
  pf.config.version = '1.0.2';
  pf.config.username = 'scanner';
  pf.config.password = 'scanner';
  reporter.add(pf.reporter);
}

// global before
before(async () => {
  addFlowReporter();
  await mock.start(4000);
});

// global after
after(async () => {
  await mock.stop();
  await reporter.end();
});

handler.addInteractionHandler('Encontrar o produto cadastrado na loja', () => {
  return {
    provider: 'lojaebac-api', // same as provider project
    flow: 'Produto', // same as provider flow name
    request: {
      method: 'GET',
      path: '/public/getProductDetails',
      body: {
        "_id": "6655334c0e75c699806e2d41"
      }
    },
    response: {
      status: 200,
      body: {
        "success": true,
        "product": {
          "_id": "6655334c0e75c699806e2d41",
          "name": "Fone de Ouvido Headphone Bluetooth sem fio over-ear WB Gyda com 100 horas de bateria, case incluso",
          "categories": [],
          "description": "Bateria Duradoura,Som estéreo 3D,Conexão Bluetooth,Carregamento rápido,Estojo protetor,Resistente a líquidos",
          "price": 399,
          "specialPrice": 199,
          "photos": [
            "https://www.wb.com.br/upload/produto/imagem/fone-de-ouvido-headphone-bluetooth-sem-fio-over-ear-wb-gyda-com-100-horas-de-bateria-case-incluso-2.webp"
          ],
          "popular": true,
          "quantity": 839,
          "visible": true,
          "additionalDetails": [],
          "createdAt": "2024-05-28T01:28:44.607Z",
          "updatedAt": "2024-05-28T01:28:44.607Z",
          "__v": 0
        }
      }
    }
  }
});

it('Ver no estoque', async () => {
  await flow("Produto")
    .useInteraction('Encontrar o produto cadastrado na loja')
    .post('http://localhost:4000/public/getProductDetails')
    .withJson({
      "productId": "6655334c0e75c699806e2d41"
    })
    .expectStatus(200);
});