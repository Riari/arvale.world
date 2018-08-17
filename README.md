# Arvale Web

[https://arvale.world/](https://arvale.world/)

## Setup

1) Run `npm i` to install dependencies.
2) Copy `src/api/config.example.json` to `src/api/config.json`.
3) Run `docker-compose up` to build and rbing up the postgres database container.
4) Install [sequelize-cli](https://github.com/sequelize/cli) with `npm i -g sequelize-cli`.
5) Run `sequelize db:migrate` to run migrations.

## API

Built on Node, TypeScript, Express and Postgres.

### Development

Code can be found in `src/api`. Run `npm run dev:api` to bring up a dev server on localhost:9090.

### Debugging

The dev server is configured to use node's `--inspect` flag by default, exposing a debugger on localhost:9229. VS Code debug config is included.

## Frontend

Built on VueJS and TypeScript.

### Development

Code can be found in `./src/frontend`. Run `npm run dev:frontend` to bring up a dev server on localhost:8080.

### Production

Run `npm run build:frontend` to create a production build of the frontend.
