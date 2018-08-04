FROM golang:1.10.3-alpine

RUN apk add --no-cache git \
    curl \
    bash

RUN curl https://glide.sh/get | sh

ENV GOPATH /go
ENV PATH $GOPATH/bin:/usr/local/go/bin:$PATH

RUN mkdir -p "$GOPATH/src" "$GOPATH/bin" \
    && chmod -R 777 "$GOPATH"

RUN go get github.com/codegangsta/gin

WORKDIR /go/src/api

CMD ["gin", "-p", "9090", "-a", "9191"]