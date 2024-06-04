const { reporter, flow, spec } = require('pactum');
const pf = require('pactum-flow-plugin');

function addFlowReporter() {
  pf.config.url = 'http://localhost:8081'; // pactum flow server url
  pf.config.projectId = 'lojaebac-api';
  pf.config.projectName = 'teste de estoque api';
  pf.config.version = '1.0.3';
  pf.config.username = 'scanner';
  pf.config.password = 'scanner';
  reporter.add(pf.reporter);
}

// global before
before(async () => {
   addFlowReporter();
});

// global after
after(async () => {
    await reporter.end();
});

it('Autenticar o produto na loja', async () => {
  await flow("Produto")
    .post('http://lojaebac.ebaconline.art.br/public/getProductDetails')
    .withJson({
      "productId": "6655334c0e75c699806e2d41"
    })
    .expectStatus(200);
});