const {
  applySpec,
  prop,
} = require('ramda')

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

const createdUserSpec = applySpec({
  id: prop('id'),
  email: prop('email'),
})

const create = async (req, res, next) => {
  const {
    email,
    password,
  } = req.body

  try {
    const user = await database.User.create({
      email,
      password,
    })

    res.locals.payload = {
      type: 'response',
      statusCode: 201,
      data: {
        ...createdUserSpec(user),
      },
    }
  } catch (error) {
    return next(handleError(error, req))
  }

  return next()
}

module.exports = create
