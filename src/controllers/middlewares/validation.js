const Joi = require('joi')
const {
  pick,
  mergeAll,
  pipe,
  map,
} = require('ramda')

const { ValidationError } = require('../../helpers/errors')
const schemas = require('../schemas')

const formatError = pick(['message', 'path'])

const validationFactory = schema => (req, res, next) => {
  const { error } = Joi.validate(req, schema, {
    allowUnknown: true,
    presence: 'required',
    convert: false,
    abortEarly: false,
  })

  if (error) {
    const fieldsWithError = error.details.map(formatError)

    return next(new ValidationError('Invalid payload', fieldsWithError))
  }

  return next()
}

const applyValidationFactory = schema => ({
  [schema]: validationFactory(schemas[schema]),
})

const validationMiddlewares = pipe(
  Object.keys,
  map(applyValidationFactory),
  mergeAll
)

module.exports = {
  validationFactory,
  validate: validationMiddlewares(schemas),
}
