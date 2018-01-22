FROM alpine:3.7 

ADD . /app
WORKDIR /app

RUN apk add --update --no-cache nodejs git yarn \
    && addgroup embetty && adduser embetty -D -G embetty \
    && chown -R embetty:embetty /app

USER embetty

RUN yarn install

CMD yarn start
