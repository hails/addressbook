FROM node:8.12.0-alpine

WORKDIR /addressbook

COPY package.json .
COPY package-lock.json .
COPY index.js .

RUN npm install -q
