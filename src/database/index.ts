import { createConnection } from 'typeorm'

import { User } from './entities/User'

import getConfig from '../config/database'

const {
  host,
  dialect,
  database,
  username,
  password,
  port,
  type,
} = getConfig

export const bootstrap = () => createConnection({
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
