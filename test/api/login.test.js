const { spec, request } = require('pactum')

request.setBaseUrl('http://lojaebac.ebaconline.art.br')

it('API - Deve autenticar o usuario', async () => {
    await spec()
        .post('/public/authUser')
        .withJson({
            "email": "admin@admin.com",
            "password": "admin123"
        })
        .expectStatus(200)
        .expectJson('success', true )
});