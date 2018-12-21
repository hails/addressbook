import firebase from 'firebase'
import { Request, Response, NextFunction } from 'express'

import firebaseConfig from '../../config/firebase'

import InternalServerError from '../../helpers/errors/internal-server'
import escriba from '../../helpers/escriba'

const { logger } = escriba

firebase.initializeApp(firebaseConfig)

const firebaseDatabase = firebase.database()

const addContact = (user, contact) =>
  firebaseDatabase.ref(`users-contacts/${user.id}`).push(contact)

const create = async (req: any, res: Response, next: NextFunction) => {
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

export default create
