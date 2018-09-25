const jwt = require('jsonwebtoken')
const { promisify } = require('util')

const { AuthenticationError } = require('../../helpers/errors')

const verifyToken = promisify(jwt.verify)

const validateHeaderExistance = (header) => {
  if (!header) {
    throw new AuthenticationError('Authentication header should have been sent')
  }
}

const validateHeaderLength = (headerArray) => {
  if (headerArray.length !== 2) {
    throw new AuthenticationError('Authentication header should have length of 2')
  }
}

const validateBearer = (bearer) => {
  if (bearer !== 'Bearer') {
    throw new AuthenticationError('Authentication header should have \'Bearer\' prefix')
  }
}

const validateToken = async (token) => {
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

module.exports = {
  validateHeaderExistance,
  validateHeaderLength,
  validateBearer,
  verifyToken,
  validateToken,
  authenticate,
}
