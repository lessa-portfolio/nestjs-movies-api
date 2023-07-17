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

### Movies [/movies]

#### List all movies [GET]

Returns a list of all movies.

+ Response 200 (application/json)

      [
        {
          "id": "1",
          "title": "Movie 1",
          "userCount": 5
        },
        {
          "id": "2",
          "title": "Movie 2",
          "userCount": 3
        },
        ...
      ]

## Author

- [Lucas Lessa](https://github.com/lessa-portfolio)

## License

Nest is [MIT licensed](LICENSE).
