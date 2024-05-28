const { spec, request } = require('pactum');

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

it('Deve editar as especificacoes do produto', async () => {
    await spec()
        .post('http://lojaebac.ebaconline.art.br/graphql')
        .withHeaders("Authorization", token)
        .withGraphQLQuery(`
mutation EditProduct($editProductId: ID!, $name: String, $description: String, $price: Float, $specialPrice: Float, $photos: [String], $quantity: Float, $visible: Boolean, $popular: Boolean) {
    editProduct(id: $editProductId, name: $name, description: $description, price: $price, specialPrice: $specialPrice, photos: $photos, quantity: $quantity, visible: $visible, popular: $popular) {
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
            "editProductId": "663d81f57294efad05afd24a",
            "name": "Fone de Ouvido",
            "description": "Bateria Duradoura,Som estéreo 3D,Conexão Bluetooth,Carregamento rápido,Estojo protetor,Resistente a líquidos",
            "price": 399,
            "specialPrice": 209,
            "photos": "https://www.wb.com.br/upload/produto/imagem/fone-de-ouvido-headphone-bluetooth-sem-fio-over-ear-wb-gyda-com-100-horas-de-bateria-case-incluso-2.webp",
            "quantity": 999,
            "visible": true,
            "popular": true
        })
        .expectStatus(200)
});
