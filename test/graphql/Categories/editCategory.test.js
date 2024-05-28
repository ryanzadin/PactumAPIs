const { spec } = require('pactum');

let token;
beforeEach(async () => {
    token = await spec()
        .post('http://lojaebac.ebaconline.art.br/graphql')
        .withJson({
            "email": "admin@admin.com",
            "password": "admin123"
        })
        .returns('data.token')
})

it('Deve editar a categoria', async () => {
    await spec()
        .post('http://lojaebac.ebaconline.art.br/graphql')
        .withGraphQLQuery(`
    mutation EditCategory($editCategoryId: ID!, $name: String, $photo: String) {
        editCategory(id: $editCategoryId, name: $name, photo: $photo) {
          name
          photo
        }
      }
`)

        .withGraphQLVariables({
            "editCategoryId": "6654d88c0e75c699806e2a41",
            "name": "Headfones",
            "photo": "https://www.wb.com.br/upload/produto/imagem/fone-de-ouvido-headphone-bluetooth-sem-fio-over-ear-wb-gyda-com-100-horas-de-bateria-case-incluso-25.webp"
        })
        .expectStatus(200)
});