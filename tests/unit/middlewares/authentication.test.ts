import jwt from 'jsonwebtoken'
import Bluebird from 'bluebird'

import {
  validateHeaderExistance,
  validateHeaderLength,
  validateBearer,
  verifyToken,
} from '../../../src/controllers/middlewares/authentication'

import AuthenticationError from '../../../src/helpers/errors/authentication'

describe('JWT Authetication', () => {
  test('validateHeaderExistance should not throw when header is sent', () => {
    expect(() => {
      validateHeaderExistance('Bearer xxxxxx')
    }).not.toThrow()
  })

  test('validateHeaderExistance should throw when no header is sent', () => {
    expect(() => {
      validateHeaderExistance('')
    }).toThrow(AuthenticationError)
  })

  test('validateHeaderLength should not throw when header is of length two', () => {
    expect(() => {
      validateHeaderLength(['Bearer', 'xxxxxx'])
    }).not.toThrow()
  })

  test('validateHeaderLength should throw when no header is no of length two', () => {
    expect(() => {
      validateHeaderLength(['Bearer'])
    }).toThrow(AuthenticationError)
  })

  test('validateBearer should not throw if it contains Bearer', () => {
    expect(() => {
      validateBearer('Bearer')
    }).not.toThrow()
  })

  test('validateBearer should throw if it does not contain Bearer', () => {
    expect(() => {
      validateBearer('xxxxx')
    }).toThrow(AuthenticationError)
  })

  test('verifyToken should resolve if it has a valid token', () => {
    const secret = 'verysecretwow'
    const signedPayload = jwt.sign({ data: 'muchcomplex' }, secret, { expiresIn: '1m' })

    expect(verifyToken(signedPayload, secret)).resolves.toBeTruthy()
  })

  test('verifyToken should reject if it has an invalid token', () => {
    const secret = 'verysecretwow'
    const anotherSecret = 'oops'
    const signedPayload = jwt.sign({ data: 'muchcomplex' }, secret, { expiresIn: '1m' })

    expect(verifyToken(signedPayload, anotherSecret)).rejects.toThrow()
  })

  test('verifyToken should reject if it has a valid but expired token', async () => {
    const secret = 'verysecretwow'
    const signedPayload = jwt.sign({ data: 'muchcomplex' }, secret, { expiresIn: '1s' })

    await Bluebird.delay(2000)

    expect(verifyToken(signedPayload, secret)).rejects.toThrow()
  })
})
