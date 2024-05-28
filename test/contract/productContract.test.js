const { reporter, flow, handler, mock} = require('pactum');
const { eachLike, like } = require('pactum-matchers');
const pf = require('pactum-flow-plugin');

let token;
beforeEach(async () => {
    token = await spec()
        .post('/public/authUser')
        .withJson({
            "email": "admin@admin.com",
            "password": "admin123"
        })
        .returns('data.token')
})

function addFlowReporter() {
  pf.config.url = 'http://localhost:8081'; // pactum flow server url
  pf.config.projectId = 'lojaebac-api';
  pf.config.projectName = 'teste de estoque';
  pf.config.version = '1.0.3';
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
      flow: 'Encontrar o produto', // same as provider flow name
      request: {
        method: 'GET',
        path: 'http://lojaebac.ebaconline.art.br/public/getProducts',
         body:{
          "_id": "6655334c0e75c699806e2d41",
          "name": "Fone de Ouvido Headphone Bluetooth sem fio over-ear WB Gyda com 100 horas de bateria, case incluso"
        }
      },
      response: {
        status: 200,
        body: {
          "success": true,
          "products": 
            {
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

it('Adicionar a lista de desejos', async () => {
  await flow("Encontrar o produto")
    .useInteraction('Encontrar o produto cadastrado na loja')
    .withHeaders("Authorization", token)
    .post('http://localhost:4000/api/wishlistProduct')
    .withJson({
        "authorization": like ("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY2M2Q3ZDI0NzI5NGVmYWQwNWFmZDFkOSIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTcxNjkyMjQ4MywiZXhwIjoxNzE3MDA4ODgzfQ.sg9-lhM9s9IvsRhXN5_MMlTwHvRNiJekaZkRjCdx2LU"),
        "productId": like ("6655334c0e75c699806e2d41")
    })
    .expectStatus(200);
});