const { spec } = require('pactum');

it('Deve criar uma nova categoria', async () => {
    await spec()
    .post('http://lojaebac.ebaconline.art.br/graphql')
    .withGraphQLQuery(`
        mutation AddCategory($name: String, $photo: String) {
            addCategory(name: $name, photo: $photo) {
              name
              photo
            }
          }
    `)

    .withGraphQLVariables({
        "name": "Headset",
        "photo": "https://www.wb.com.br/upload/produto/imagem/fone-de-ouvido-headphone-bluetooth-sem-fio-over-ear-wb-gyda-com-100-horas-de-bateria-case-incluso-25.webp"
      })

    .expectStatus(200)

});