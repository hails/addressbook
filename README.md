# Addressbook
[![CircleCI](https://circleci.com/gh/hails/addressbook.svg?style=svg&circle-token=0c0b91456b9ad919ffaf0fffcef865e4d12e699e)](https://circleci.com/gh/hails/addressbook)

:pager: A addressbook service to store your contacts

## Table of Contents
- [Technology](#technology)
- [Getting Started](#getting-started)
  - [Running Locally](#running-locally)
  - [Running Tests](#running-tests)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)

## Technology
Stuff we use:
- **[Docker](https://docs.docker.com)** and **[Docker Compose](https://docs.docker.com/compose/)** to create our development and test environments.
- **[CircleCI](https://circleci.com)** for deployment and as general CI.
- **[Now.sh](http://now.sh)** as our deployment provider.
- **[Postgres](https://www.postgresql.org)** to store our data and **[Sequelize](http://docs.sequelizejs.com)** as a Node.js ORM.
- **[Jest](https://github.com/facebook/jest)** as a framework for tests.

## Getting Started
To get started, you should install **Make**, **Docker** and **Docker Compose**.

Then, clone the repository:
```sh
$ git clone git@github.com:hails/addressbook
```

You should create an `.env` file (you can use `.env.example` as a reference).
> To run the server locally, you'll need to put your [Firebase RTDB](https://firebase.google.com/docs/database/web/start) credentials on the `.env` file.

And you should be ready.

## Running Locally
To run locally, simply run the following command:
```sh
$ make run
```
This will pull and build all images necessary, as well as starting all containers.
By default, the server is located at `localhost:3000`.

## Running Tests
To run our tests, run the following command:
```sh
$ make test
```

## API Documentation
The api documentation is available in our [Postman API Documentation](https://documenter.getpostman.com/view/969865/RWaRNQwR)
Also, you can just run directly on Postman, either by accessing the above documentation or by hitting the following button: <br/>
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/8036fa95ae8c68527f48)


## Deployment
We're using [Zeit's Now.sh](https://now.sh) as provider and it's fully integrated with our CI pipeline.

In order to make a deploy, you just have to push a tag using the pattern `vx.y.z` and follow it on Circle CI workflow.
