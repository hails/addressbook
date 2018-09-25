const express = require('express')
const { validate } = require('../middlewares/validation')
const createHandler = require('./create')
const loginHandler = require('./login')

const router = express.Router()

router.post(
  '/',
  validate.user,
  createHandler
)

router.post(
  '/login',
  validate.user,
  loginHandler
)

module.exports = router
