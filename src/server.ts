import express from 'express'
import bodyParser from 'body-parser'

import * as database from './database'

import errorHandler from './controllers/middlewares/error'
import responseHandler from './controllers/middlewares/response'
import routeNotFoundHandler from './controllers/middlewares/notfound'

import escriba from './helpers/escriba'

import userRouter from './controllers/user'
import contactRouter from './controllers/contact'

const app = express()

const {
  httpLogger,
  logger,
} = escriba

const bootstrap = async () => {
  try {
    if (process.env.NODE_ENV !== 'test') {
      await database.bootstrap()
    }

    await app.listen(process.env.PORT)

    logger.info('Server up and running', {
      port: process.env.PORT,
      nodeEnv: process.env.NODE_ENV,
    })
  } catch (err) {
    logger.error('Error bootstraping application', {
      stack: err.stack,
    })
  }
}

app.use(bodyParser.json())
app.use(httpLogger)

app.disable('x-powered-by')

app.use(
  '/users',
  userRouter
)

app.use(
  '/contacts',
  contactRouter
)

app.use(routeNotFoundHandler)
app.use(errorHandler)
app.use(responseHandler)

bootstrap()

export default app
