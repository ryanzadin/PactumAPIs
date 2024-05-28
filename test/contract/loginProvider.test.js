const { reporter, flow,request } = require('pactum');
const pf = require('pactum-flow-plugin');

request.setBaseUrl('http://lojaebac.ebaconline.art.br')


function addFlowReporter() {
  pf.config.url = 'http://localhost:8081'; // pactum flow server url
  pf.config.projectId = 'lojaebac-api';
  pf.config.projectName = 'teste api';
  pf.config.version = '1.0.0';
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

it('API - Deve autenticar o usuario com sucesso', async () => {
    await flow("Login")
        .post('/public/authUser')
        .withJson({
            "email": "admin@admin.com",
            "password": "admin123"
        })
        .expectStatus(200)
        .expectJson('success', true )
});