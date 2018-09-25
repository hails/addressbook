const firebase = require('firebase')

const firebaseConfig = require('../../config/firebase')
const {
  InternalServerError,
} = require('../../helpers/errors')

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
    console.dir(error)
    return next(new InternalServerError())
  }

  return next()
}

module.exports = create
