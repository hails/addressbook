import jwt from 'jsonwebtoken'
import { promisify } from 'util'

import AuthenticationError from '../../helpers/errors/authentication'

export const verifyToken = promisify(jwt.verify)

export const validateHeaderExistance = (header) => {
  if (!header) {
    throw new AuthenticationError('Authentication header should have been sent')
  }
}

export const validateHeaderLength = (headerArray) => {
  if (headerArray.length !== 2) {
    throw new AuthenticationError('Authentication header should have length of 2')
  }
}

export const validateBearer = (bearer) => {
  if (bearer !== 'Bearer') {
    throw new AuthenticationError('Authentication header should have \'Bearer\' prefix')
  }
}

export const validateToken = async (token) => {
  try {
    const payload =
      await verifyToken(token, process.env.JWT_SECRET, { maxAge: '5m' })

    return payload
  } catch (error) {
    throw new AuthenticationError('Authentication header has invalid JWT')
  }
}

const authenticate = async (req, res, next) => {
  if (process.env.NODE_ENV === 'test') {
    res.locals.user = {
      id: 'some-random-id',
    }

    return next()
  }

  const authHeader = req.get('authorization')

  try {
    validateHeaderExistance(authHeader)

    const splittedAuth = authHeader.split(' ')
    validateHeaderLength(splittedAuth)

    const [bearer, token] = splittedAuth
    validateBearer(bearer)

    const payload = await validateToken(token)

    res.locals.user = payload
  } catch (error) {
    return next(error)
  }
  return next()
}

export default authenticate
