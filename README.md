<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Documetation

### Auth [/auth]

`POST: /auth/login`

Login and generate token

+ Body

      {
        "email": "test@mail.com",
        "password": "12345678"
      }

+ Response 200 (application/json) 

        {
          "token": "token"
        }

### Users [/users]

`POST: /users`

Create a new user

+ Body

      {
        "name": "test",
        "email": "test@mail.com",
        "password": "12345678"
      }

+ Response 200 (application/json) 

      {
        "name": "test",
        "email": "test@mail.com",
        "password": "12345678", // remove it soon
        "movies": [],
        "_id": "64b40e522900433ddc8c8d14",
        "__v": 0
      }

### Movies [/movies]

`GET: /movies`

List all movies

+ Response 200 (application/json)

      [
        {
          "_id": "64b2b3410cc7644ceb731999",
          "ref": "667538",
          "users": [
            "64b40e522900433ddc8c8d14",
            "64b534e7b8a461614ab69a96"
          ],
          "__v": 16,
          "userCount": 2
        }
      ]

`POST: /movies`

Create a new movies

+ Body

      {
        "ref": "47964"
      }

+ Response 200 (application/json)

      {
        "ref": "47964",
        "users": [],
        "_id": "64b2b3a10cc7644ceb7319ab",
        "__v": 0
      }

### Likes [/likes]

`GET: /likes` - token required

Get all movies liked by user

+ Response 200 (application/json)

      [
        "667538",
        "447365"
      ]

`POST: /likes/like` - token required

Like a movie with userId

+ Body

      {
        "movieId": "447365"
      }

+ Response 200 (application/json)

      No body returned for response

`POST: /likes/dislike` - token required

Dislike a movie with userId

+ Body

      {
        "movieId": "447365"
      }

+ Response 200 (application/json)

      No body returned for response

## Author

- [Lucas Lessa](https://github.com/lessa-portfolio)

## License

Nest is [MIT licensed](LICENSE).
