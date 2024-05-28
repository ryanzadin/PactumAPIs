const { spec } = require('pactum');

it('Deve deletar produto', async () => {
    await spec()
        .post('http://lojaebac.ebaconline.art.br/graphql')
        .withGraphQLQuery(`
    mutation Mutation($deleteProductId: ID!) {
        deleteProduct(id: $deleteProductId){
          name
          description
          price
          specialPrice
          photos
          popular
          quantity
          visible
        }
      }
    `)
        .withGraphQLVariables({
            "deleteProductId": "663d81f57294efad05afd24a"
        })
        .expectStatus(200)
        .expectJsonMatch('data.deleteProduct.name', null)
});