import Joi from 'joi'
import { Request, Response, NextFunction } from 'express'
import {
  pick,
} from 'ramda'

import ValidationError from '../../helpers/errors/validation'

const formatError = pick(['message', 'path'])

const validate = (schema: object) => (req: Request, res: Response, next: NextFunction) => {
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

export default validate
