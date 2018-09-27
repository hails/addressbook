const express = require('express')
const { validate } = require('../middlewares/validation')
const { authenticate } = require('../middlewares/authentication')
const { rateLimiter } = require('../middlewares/rate-limit')
const createHandler = require('./create')

const router = express.Router()

router.post(
  '/',
  authenticate,
  rateLimiter,
  validate.contact,
  createHandler
)

module.exports = router
