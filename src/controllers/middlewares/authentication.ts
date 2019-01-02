import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

import AuthenticationError from '../../helpers/errors/authentication'

export const verifyToken = (payload: string, secret: string, options?: jwt.VerifyOptions) => {
  return new Promise((resolve, reject) => jwt.verify(payload, secret, options, (err, res) => {
    if (err) {
      reject(err)
    } else {
      resolve(res)
    }
  }))
}

export const validateHeaderExistance = (header: string | undefined) => {
  if (!header) {
    throw new AuthenticationError('Authentication header should have been sent')
  }
}

export const validateHeaderLength = (headerArray: string[]) => {
  if (headerArray.length !== 2) {
    throw new AuthenticationError('Authentication header should have length of 2')
  }
}

export const validateBearer = (bearer: string) => {
  if (bearer !== 'Bearer') {
    throw new AuthenticationError('Authentication header should have \'Bearer\' prefix')
  }
}

export const validateToken = async (token: string) => {
  try {
    const payload =
      await verifyToken(token, process.env.JWT_SECRET!, <jwt.VerifyOptions>{ maxAge: '5m ' })

    return payload
  } catch (error) {
    throw new AuthenticationError('Authentication header has invalid JWT')
  }
}

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === 'test') {
    res.locals.user = {
      id: 'some-random-id',
    }

    return next()
  }

  const authHeader = req.get('authorization')

  try {
    validateHeaderExistance(authHeader)

    const splittedAuth = authHeader!.split(' ')
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
