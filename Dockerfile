FROM node:8.12.0-alpine

WORKDIR /addressbook

RUN apk add --update \
  python \
  make \
  g++

COPY package.json .
COPY package-lock.json .
COPY .eslintrc .
COPY src/ ./src
COPY tests ./tests

RUN npm install -q
