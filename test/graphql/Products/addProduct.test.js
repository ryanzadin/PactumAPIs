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

it('Deve adicionar produtos a categoria', async () => {
  await spec()
    .post('http://lojaebac.ebaconline.art.br/graphql')
    .withHeaders("Authorization", token)
    .withGraphQLQuery(`
    mutation AddProduct($name: String, $categories: [CategoryInput], $description: String, $price: Float, $specialPrice: Float, $photos: [String], $popular: Boolean, $quantity: Float, $visible: Boolean, $additionalDetails: [String]) {
      addProduct(name: $name, categories: $categories, description: $description, price: $price, specialPrice: $specialPrice, photos: $photos, popular: $popular, quantity: $quantity, visible: $visible, additionalDetails: $additionalDetails) {
        name
        categories {
          name
          photo
        }
        description
        price
        specialPrice
        photos
        popular
        quantity
        visible
        additionalDetails
      }
    }
`)
    .withGraphQLVariables({

      "name": "Fone de Ouvido Headphone Bluetooth sem fio over-ear WB Gyda com 100 horas de bateria, case incluso",
      "description": "Bateria Duradoura,Som estéreo 3D,Conexão Bluetooth,Carregamento rápido,Estojo protetor,Resistente a líquidos",
      "price": 399,
      "specialPrice": 199,
      "photos": "https://www.wb.com.br/upload/produto/imagem/fone-de-ouvido-headphone-bluetooth-sem-fio-over-ear-wb-gyda-com-100-horas-de-bateria-case-incluso-2.webp",
      "popular": true,
      "quantity": 839,
      "visible": true

    })
    .expectStatus(200)
    .expectJsonMatch('data.addProduct.visible', true)
});