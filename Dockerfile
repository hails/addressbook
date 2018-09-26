FROM node:8.12.0-alpine
WORKDIR /addressbook
COPY package.json .
COPY package-lock.json .
COPY .eslintrc .
COPY src .
RUN apk add --update --no-cache --virtual build-dependencies \
  python \
  make \
  g++ \
  && if [ "x$NODE_ENV" == "xproduction" ]; then npm install --production ; else npm install ; fi \
  && apk del build-dependencies

CMD [ "npm", "start" ]
