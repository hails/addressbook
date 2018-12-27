import { createConnection } from 'typeorm'

import { User } from './entities/User'

import getConfig from '../config/database'

const {
  host,
  database,
  username,
  password,
  port,
  type,
  url,
} = getConfig

export const bootstrap = () => createConnection({
  url,
  host,
  port,
  username,
  password,
  database,
  type,
  entities: [
    User,
  ],
})
