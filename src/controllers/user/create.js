const database = require('../../database')
const {
  InternalServerError,
  ConflictError,
} = require('../../helpers/errors')
const { logger } = require('../../helpers/escriba')

const {
  UniqueConstraintError,
} = database.Sequelize

const handleError = (error, req) => {
  if (error instanceof UniqueConstraintError) {
    return new ConflictError('Email already registered')
  }
  logger.error(error, { id: req.id })
  return new InternalServerError()
}

const create = async (req, res, next) => {
  const {
    email,
    password,
  } = req.body

  try {
    await database.User.create({
      email,
      password,
    })

    res.locals.payload = {
      type: 'response',
      statusCode: 201,
    }
  } catch (error) {
    return next(handleError(error, req))
  }

  return next()
}

module.exports = create
