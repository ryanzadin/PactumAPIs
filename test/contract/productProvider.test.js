const { reporter, flow , spec} = require('pactum');
const pf = require('pactum-flow-plugin');


let token;
beforeEach(async () => {
    token = await spec()
        .post('http://lojaebac.ebaconline.art.br/public/authUser')
        .withJson({
            "email": "admin@admin.com",
            "password": "admin123"
        })
        .returns('data.token')
})

function addFlowReporter() {
    pf.config.url = 'http://localhost:8081'; // pactum flow server url
    pf.config.projectId = 'lojaebac-category';
    pf.config.projectName = 'teste de categoria';
    pf.config.version = '1.0.6';
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

it('API - Deve adicionar a lista', async () => {
    await flow("Desejo")
        .post('http://lojaebac.ebaconline.art.br/api/wishlistProduct')
        .withHeaders("authorization", token)
        .withJson({
            "authorization": token,
            "productId": "6655277a0e75c699806e2c4d"
          })
        .expectStatus(200)
});