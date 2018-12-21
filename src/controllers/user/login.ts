import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import { getRepository } from 'typeorm'

import { User } from '../../database/entities/User'

import InternalServerError from '../../helpers/errors/internal-server'
import AuthenticationError from '../../helpers/errors/authentication'
import escriba from '../../helpers/escriba'

const { logger } = escriba

const signPayload = promisify(jwt.sign)

const login = async (req, res, next) => {
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

        const token = await signPayload(payload, process.env.JWT_SECRET, { expiresIn: '5m' })

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
