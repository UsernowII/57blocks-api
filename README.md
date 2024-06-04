# Requirements

- Node.js v20+ or Docker and Docker Compose
- Yarn v1.22.19
- Postgres running on local instance or Docker

## 🧑‍💻 Developing

First, we will need to create our .env file, we can create a copy from the example one:

```bash
cp .env.example .env
```

The database is dockerized 🐳 for local env, if we want to start the app in **development mode**, we just need to run:

```bash
docker-compose up

```

## ⚙️ Install Dependencies

```bash
yarn
```

## ✅ Run Project

```bash
yarn start:dev
```

This development mode with work with **hot-reload** and exposing a **debug port**, the `9229`, so later we can connect from our editor to it.

Now, you should be able to start debugging configuring using your IDE. For example, if you are using vscode, you can create a `.vscode/launch.json` file with the following config:

```json
{
  "version": "0.1.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Attach to docker",
      "restart": true,
      "port": 9229,
      "remoteRoot": "/app"
    }
  ]
}
```

This service is providing just a health endpoint which you can call to verify the service is working as expected:

```bash
curl --request GET \
  --url http://localhost:3001/health
```

If you want to stop developing, you can stop the service running:

```bash
docker-compose down
```

## ⚙️ Building

```bash
yarn build
```

## ⚙️ Production

```bash
yarn start
```

## ✅ Testing

The service provide different scripts for running the tests, to run all of them you can run:

```bash
yarn test
```

If you are interested just in the unit tests, you can run:

```bash
yarn test:unit
```

## 💅 Linting

To run the linter you can execute:

```bash
yarn lint
```

And for trying to fix lint issues automatically, you can run:

```bash
yarn lint:fix
```

## API

### Base URLs

### Local Environment

```http request
http://localhost:3001/api
```

### Production Environment

```http request
https://five7blocks-api.onrender.com/api
```

### Register a New User.

#### Request Body

```bash
curl --location 'http://localhost:3001/api/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username" : "any-user",
    "email": "any-email@gmail.com",
    "password": "MyPassword#",
    "passwordConfirmation": "MyPassword#"
}'
```

### Login User.

#### Request Body

```bash
curl --location 'http://localhost:3001/api/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "any-email@gmail.com",
    "password": "MyPassword#"
}'
```

For all subsequent requests, the JWT token must be included in the Authorization header as a Bearer token.

```http request
Authorization: Bearer <your_jwt_token>
```

### Get Movies.

#### Request Body

#### Query Parameters

- `isPublic` (optional) `true by default`: Boolean. If true, retrieves public movies. If false, retrieves private movies belonging to the authenticated user. Defaults to true.
- `page` (optional): Number. Specifies the page number for pagination.
- `limit` (optional): Number. Specifies the number of items per page for pagination.

Retrieve public movies. Supports pagination.

```bash
curl --location 'http://localhost:3001/api/movie' \
--header 'Authorization: Bearer eyJhbGciOiJIUPsZnoGtbl5ss10nAI0'
```

Retrieve private movies. Supports pagination.

```bash
curl --location 'http://localhost:3001/api/movie?page=1&limit=10&isPublic=false' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC'
```

### Create Movie.

#### Request Body

```bash
curl --location 'http://localhost:3001/api/movie' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciskszUFVRXgj1YBm6zOTC-jFo' \
--data '{
    "isPublic": false,
    "title": "civil war II",
    "releaseDate": "2024-04-10",
    "originalLanguage": "en",
    "genre": "action",
    "posterPath": "/sh7Rg8Er3tFcN9BpKIPOMvALgZd.jpg",
    "backdropPath": "string",
    "overview": "string"
}'
```

### Update Movie.

### Path Parameters

- `id`: The UUID of the movie to be updated.

#### Request Body

```bash
curl --location --request PUT 'http://localhost:3001/api/movie/uuid-movie' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiI1MTUxMn0.ay26CeQkV0' \
--data '{
    "overview": "something to update"
}'
```
