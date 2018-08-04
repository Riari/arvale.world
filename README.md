# Arvale Web

[https://arvale.world/](https://arvale.world/)

## API

Written in Golang. Uses [Glide](https://github.com/Masterminds/glide) for dependency management and [Gin](https://github.com/codegangsta/gin) for automatic reloading on changes.

### Development

Run `docker-compose up` to bring up the database and API containers, then `docker exec arvale-web-api glide up` to install dependencies. Code can be found in `./src/api`.

### Build

Run `docker exec arvale-web-api go build -o /go/build/api` to build the API binary.

## Frontend

Written in VueJS.

### Development

Code can be found in `./src/frontend`. From there, run `npm i` to install dependencies and `npm run dev` to bring up a dev server on localhost:3500.

### Production

Run `npm run build` to create a production build of the frontend.
