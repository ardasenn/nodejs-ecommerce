### Hi everyone! I’ve developed my second Node.js API with Express.js😊

### Before you start, make sure to add your .env file.I am going to provide sample .env file template below. After that, you’ll need to install the necessary Node modules.

Here are some key points about my project:

#### User Registration and Tokens:

- Users must register with credentials below.

```javascript
{
  "name": "Arda Şen",//required
  "email": "ardasen.96@gmail.com",//required
  "password": "123456",//required
  "street": "123 Main Street",
  "apartment": "Apt 4",
  "city": "Cityville",
  "zip": "12345",
  "country": "Countryland",
  "phone": "123-456-7890",//required
  "isAdmin": true
}
```

- After register , they receive an access token for business logic.Here is the sample login request below

```js
{
  "email":"ardasen.96@gmail.com",
  "password":"123456"
}
```

#### Category Operations:

- Admin can add new categories, update existing ones, and list categories.

#### Product Operations:

- Admin can add new products, update existing ones, and list products.
- Everyone can acces all products.
- "GET /featured/:count" Used to retrieve the count of featured products, up to the specified amount. This endpoint checks the "isFeatured" property among the products. If the "isFeatured" property of a product is true, it is considered a featured product.

#### User Operations:

- User can change password
- Admin can receive user count , all user and get a user

#### Order Operations:

- Admin can do basic CRUD operations , receive Total sales and user orders

### What I Learned from This Project:

- User Authentication with express-jwt in Node.js. I’ve implemented secure authentication using JSON Web Tokens.
- I learned how to use service layer.

#### Sample .env file content

- DATABASE_URI= "your connection"
- ACCES_TOKEN_SECRET="your secret"
- REFRESH_TOKEN_SECRET="your secret"
- API_URL=/api/v1

##### You can check these screenshots to see all endpoints

![Picture 1](https://cdn.discordapp.com/attachments/868275280186314782/1175756306972418099/image.png?ex=656c6364&is=6559ee64&hm=6b625e8450315e440048a641c5953a9c642a2de407f62f4739e4d2c05d5a9c87&) ![Picture 2](https://cdn.discordapp.com/attachments/868275280186314782/1175756439151726672/image.png?ex=656c6383&is=6559ee83&hm=83311c4085e3e26d9911f83d945bf056d8d50454c9a9b8105289897aa090e54a&)
