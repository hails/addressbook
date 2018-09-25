const express = require('express')
const { validate } = require('../middlewares/validation')
const createHandler = require('./create')

const router = express.Router()

router.post(
  '/',
  validate.user,
  createHandler
)

module.exports = router
