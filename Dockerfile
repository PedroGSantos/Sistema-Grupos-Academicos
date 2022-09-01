FROM node:16.17-alpine AS build
COPY . .
RUN apk add --no-cache git && \
    yarn install && \
    yarn prisma generate && \
    yarn build

FROM node:16.17-alpine

WORKDIR /home/node/app

COPY package.json yarn.lock ./
RUN apk add --no-cache git && \
    yarn install --production && yarn cache clean &&\
    apk del git
COPY . .

USER node

CMD [ "node", "src/server" ]
