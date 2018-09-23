FROM node:8.12.0-alpine

WORKDIR /addressbook

COPY package.json .
COPY package-lock.json .
COPY src/ ./src
COPY tests ./tests

RUN npm install -q
