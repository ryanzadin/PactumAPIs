const { reporter, flow, handler, mock , spec} = require('pactum');
const pf = require('pactum-flow-plugin');
const { eachLike, like } = require('pactum-matchers');

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
    pf.config.projectId = 'lojaebac-wishlist-front';
    pf.config.projectName = 'teste de wishlist front';
    pf.config.version = '1.0.6';
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

handler.addInteractionHandler('Product response', () => {
    return {
        provider: 'teste-lista',
        flow: 'Desejo',
        request: {
            method: 'POST',
            path: '/api/wishlistProduct',
            body: {
                "authorization": like("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY2M2Q3ZDI0NzI5NGVmYWQwNWFmZDFkOSIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTcxNzcwNDk4MSwiZXhwIjoxNzE3NzkxMzgxfQ.-ApslR0hKSM_S4hs8Eh9fe0_tZyYGKBwvcIef9Vl0lc"),
                "productId": "6655277a0e75c699806e2c4d"
            }
        },
        response: {
            "success": true,
            "message": "product added to wishlist"
        }
    }
})

it('FRONT - Deve adicionar a lista de Desejo', async () => {
    await flow("Desejo")
        .post('http://localhost:4000/api/wishlistProduct')
        .withHeaders("authorization", token)
        .withJson({
            "authorization": token,
            "productId": "6655277a0e75c699806e2c4d"
        })
        .expectStatus(200)
});