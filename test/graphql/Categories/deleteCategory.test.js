const {spec} = require ('pactum')

it('Deve excluir a categoria', async () => {
    await spec()
    .post('http://lojaebac.ebaconline.art.br/graphql')
    .withGraphQLQuery(`
    mutation DeleteCategory($deleteCategoryId: ID!) {
        deleteCategory(id: $deleteCategoryId) {
          name
          photo
        }
      }
    `)
    .withGraphQLVariables({
        "deleteCategoryId": "6654d88c0e75c699806e2a41"
    })
    .expectStatus(200)
});