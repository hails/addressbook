const express = require('express')
const { validate } = require('../middlewares/validation')
const { authenticate } = require('../middlewares/authentication')
const createHandler = require('./create')

const router = express.Router()

router.post(
  '/',
  authenticate,
  validate.contact,
  createHandler
)

module.exports = router
