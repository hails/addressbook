const firebase = require('firebase')

const firebaseConfig = require('../../config/firebase')
const {
  InternalServerError,
} = require('../../helpers/errors')
const { logger } = require('../../helpers/escriba')

firebase.initializeApp(firebaseConfig)

const firebaseDatabase = firebase.database()

const addContact = (user, contact) =>
  firebaseDatabase.ref(`users-contacts/${user.id}`).push(contact)


const create = async (req, res, next) => {
  const contact = req.body

  try {
    await addContact(res.locals.user, contact)

    res.locals.payload = {
      statusCode: 204,
    }
  } catch (error) {
    logger.error(error, { id: req.id })
    return next(new InternalServerError())
  }

  return next()
}

module.exports = create
