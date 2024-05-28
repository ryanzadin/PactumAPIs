// test.js
const { spec, request} = require('pactum');
const { eachLike, like } = require('pactum-matchers');

request.setBaseUrl('http://lojaebac.ebaconline.art.br')

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

it('API - listagem de usuario', async () => {
    await spec()
      .get('/api/getUsers')
      .withHeaders("Authorization", token)
      .expectStatus(200)
      .expectJsonMatch({
          users: eachLike({
           "_id": like("664fbc8e23adf6ec33ab6c64"),
            email: like("chaim.walter26@hotmail.com"),
            profile: {
              firstName: like("Floy")
            }
          })
      })
});