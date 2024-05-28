// test.js
const { spec } = require('pactum');
const { eachLike, like } = require('pactum-matchers');

it('listagem de usuarios com like', async () => {
  await spec()
    .post('http://lojaebac.ebaconline.art.br/graphql')
    .withGraphQLQuery(`
  query ExampleQuery {
  
    Users     
    {
      email
      id
      phone
      addresses {
        city
      }
    }
  }
  `)
    .expectStatus(200)
    .expectJsonMatch({
      data:{
        Users: eachLike({
          id: like("6643fe0c49f74b6d2fcf1e7c"),
          email: like("jailyn13@hotmail.com")
        })
      }
    })
});
