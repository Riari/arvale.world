# Arvale Web

Website for the NWN:EE Persistent World, Arvale. [https://arvale.world/](https://arvale.world/)

## Dev Setup

1) Run `npm i` to install dependencies.
2) Copy `src/api/.env.example` to `src/api/.env` and complete it.
3) Run `docker-compose up` to build and bring up the Postgres database container.
4) Run `npm run orm -- migration:run` to run migrations. This will also seed the roles table.

## API

Built on Node, TypeScript, Express and Postgres.

### Development

Code can be found in `src/api`. Run `npm run dev:api` to bring up a dev server on localhost:9090.

### Debugging

The dev server is configured to use node's `--inspect` flag by default, exposing a debugger on localhost:9229. VS Code debug config is included.

### Permissions

Permission<>Role assignments are defined in `src/policy/permissions.json`. These are used both in route permission checks (see `src/policy/index.ts`) and to compile a list of permissions on a user object before returning it from an auth endpoint (such as /login or /me).

At the top of the file are generic, non-route based permissions for reference in the frontend; the rest are route-based, where the key is a permission name derived from the HTTP verb and URL parts (minus parameters) of a successfully routed request.

### Production

Run `npm run build:api` to create a production build of the API. Database settings can be overridden from the defaults via the `DB_*` environment variables (see below).

### Environment

The following environment variables are used by the API:

```
DB_HOST
DB_PORT
DB_USERNAME
DB_PASSWORD
DB_NAME
APP_HOST
APP_PORT
APP_BASE_URL
APP_MAIL_HOST *
APP_MAIL_SECURE
APP_MAIL_PORT
APP_MAIL_AUTH_USER *
APP_MAIL_AUTH_PASS *
APP_AUTH_SECRET *
APP_AUTH_LIFETIME
APP_NWN_IP *
APP_NWN_PORT
```

\* denotes variables without defaults

## Frontend

Built on VueJS and TypeScript.

### Development

Code can be found in `./src/frontend`. Run `npm run dev:frontend` to bring up a dev server on localhost:8080.

### Production

Run `npm run build:frontend` to create a production build of the frontend.
