import firebase from 'firebase'
import { Response, NextFunction, Request } from 'express'
import IEscribaRequest from '../request-interface'

import firebaseConfig from '../../config/firebase'

import InternalServerError from '../../helpers/errors/internal-server'
import escriba from '../../helpers/escriba'

const { logger } = escriba

firebase.initializeApp(firebaseConfig)

const firebaseDatabase = firebase.database()

interface IUser {
  id: string,
  email: string,
  password: string,
}

interface IContact {
  name?: string,
  email?: string,
  phone_number?: string,
  country?: string,
}

const addContact = (user: IUser, contact: IContact) =>
  firebaseDatabase.ref(`users-contacts/${user.id}`).push(contact)

const create = async (req: IEscribaRequest & Request, res: Response, next: NextFunction) => {
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
