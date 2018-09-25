const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')

const database = require('../../database')
const {
  InternalServerError,
  AuthenticationError,
} = require('../../helpers/errors')

const signPayload = promisify(jwt.sign)

const login = async (req, res, next) => {
  const {
    email,
    password,
  } = req.body

  try {
    const user = await database.User.find({
      where: {
        email,
      },
      raw: true,
    })

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password)
      const token = await signPayload(user, process.env.JWT_SECRET, { expiresIn: '5m' })

      if (passwordMatch) {
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
    console.dir(error)
    return next(new InternalServerError())
  }

  return next(new AuthenticationError('Email or password incorrect'))
}

module.exports = login
