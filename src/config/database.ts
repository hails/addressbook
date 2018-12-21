import { getConfig } from '.'

const host = process.env.DATABASE_URL
const database = process.env.DATABASE_NAME
const username = process.env.DATABASE_USERNAME
const password = process.env.DATABASE_PASSWORD
const port = process.env.DATABASE_PORT
const type = 'postgres'
const migrations = ['src/database/migrations/*.ts']

const config = {
  development: {
    host,
    database,
    username,
    password,
    port,
    type,
    migrations,
  },
  test: {
    type,
    migrations,
    host: 'test-database',
    database: 'postgres',
    username: 'postgres',
    password: 'addressbook',
    port: 5432,
  },
  production: {
    host,
    database,
    username,
    password,
    port,
    type,
    migrations,
  },
}

export = getConfig(config)
