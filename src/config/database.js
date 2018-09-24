
const { getConfig } = require('./')

const host = process.env.DATABASE_URL
const database = process.env.DATABASE_NAME
const username = process.env.DATABASE_USERNAME
const password = process.env.DATABASE_PASSWORD
const port = process.env.DATABASE_PORT
const dialect = 'postgres'

const config = {
  development: {
    host,
    database,
    username,
    password,
    port,
    dialect,
    logging: false,
  },
  test: {
    host: 'test-database',
    dialect: 'postgres',
    database: 'postgres',
    username: 'postgres',
    password: 'addressbook',
    port: 5432,
    logging: false,
  },
  production: {
    host,
    database,
    username,
    password,
    port,
    dialect,
    logging: false,
  },
}

module.exports = getConfig(config)
