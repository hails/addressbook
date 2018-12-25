import {
  applySpec,
  prop,
} from 'ramda'

import { User } from '../../database/entities/User'

import InternalServerError from '../../helpers/errors/internal-server'
import ConflictError from '../../helpers/errors/conflict'
import escriba from '../../helpers/escriba'

const { logger } = escriba

const handleError = (error, req) => {
  if (error.name === 'QueryFailedError' && error.code === '23505') {
    return new ConflictError('Email already registered')
  }

  console.dir(error)
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
    const user = new User()
    user.email = email
    user.password = password

    await user.save()

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

export default create
