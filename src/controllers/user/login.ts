import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Response, NextFunction } from 'express'

import { User } from '../../database/entities/User'

import InternalServerError from '../../helpers/errors/internal-server'
import AuthenticationError from '../../helpers/errors/authentication'
import escriba from '../../helpers/escriba'
import IEscribaRequest from '../request-interface'

const { logger } = escriba

const signPayload =
  (payload: string | Buffer | object, secret: string, options: jwt.SignOptions) => {
    return new Promise((resolve, reject) => jwt.sign(payload, secret, options, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    }))
  }

const login = async (req: IEscribaRequest, res: Response, next: NextFunction) => {
  const {
    email,
    password,
  } = req.body

  try {
    const user = await User.findOne({ email })

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password)

      if (passwordMatch) {
        const payload = {
          email: user.email,
          id: user.id,
        }

        const token = await signPayload(payload, process.env.JWT_SECRET!, { expiresIn: '5m' })

        res.locals.payload = {
          data: {
            token,
          },
          statusCode: 200,
        }

        return next()
      }
    }
  } catch (error) {
    logger.error(error, { id: req.id })
    return next(new InternalServerError())
  }

  return next(new AuthenticationError('Email or password incorrect'))
}

export default login
