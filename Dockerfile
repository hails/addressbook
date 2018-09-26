FROM node:8.12.0-alpine as base
WORKDIR /addressbook
COPY package.json .
COPY package-lock.json .
COPY .eslintrc .
COPY src .
RUN apk add --update --no-cache \
  python \
  make \
  g++
RUN if [ "x$NODE_ENV" == "xproduction" ]; then yarn install --production ; else yarn install ; fi

CMD [ "npm", "start" ]
