const express = require('express')
const bodyParser = require('body-parser')

const database = require('../database')
const errorHandler = require('../controllers/middlewares/error')
const responseHandler = require('../controllers/middlewares/response')
const routeNotFoundHandler = require('../controllers/middlewares/notfound')

const app = express()

const bootstrap = async () => {
  try {
    if (process.env.NODE_ENV !== 'test') {
      await database.bootstrap()
    }

    await app.listen(process.env.PORT)

    console.info('Server up and running', {
      port: process.env.PORT,
      nodeEnv: process.env.NODE_ENV,
    })
  } catch (err) {
    console.error('Error bootstraping application', {
      stack: err.stack,
    })
  }
}

app.use(bodyParser.json())

app.disable('x-powered-by')

app.use(routeNotFoundHandler)
app.use(errorHandler)
app.use(responseHandler)

bootstrap()

module.exports = app
