const express = require('express')
const { validate } = require('../middlewares/validation')
const { rateLimiter } = require('../middlewares/rate-limit')
const createHandler = require('./create')
const loginHandler = require('./login')

const router = express.Router()

router.post(
  '/',
  rateLimiter,
  validate.user,
  createHandler
)

router.post(
  '/login',
  rateLimiter,
  validate.user,
  loginHandler
)

module.exports = router
