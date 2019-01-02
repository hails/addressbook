import request, { Response } from 'supertest'
import { Connection } from 'typeorm'

import app from '../../../src/server'
import * as database from '../../../src/database'

describe('User creation', () => {
  let db: Connection

  beforeAll(async () => {
    db = await database.bootstrap()
  })

  describe('POST `/users` with valid user data', () => {
    const userData = {
      email: 'some@email.com',
      password: 'amisecure?',
    }

    test('should give a valid response', () =>
      request(app)
        .post('/users')
        .send(userData)
        .set('Accept', 'application/json')
        .then((response: Response) => {
          expect(response).toHaveProperty('status', 201)
          expect(response.body).toHaveProperty('data')
          expect(response.body.data).toHaveProperty('id')
          expect(response.body.data).toHaveProperty('email', userData.email)
        }))
  })

  describe('POST `/users` with already used user data', () => {
    const userData = {
      email: 'some@email.com',
      password: 'amisecure?',
    }

    test('should give a already registered error', () =>
      request(app)
        .post('/users')
        .send(userData)
        .set('Accept', 'application/json')
        .then((response: Response) => {
          expect(response).toHaveProperty('status', 409)
          expect(response.body).toEqual({
            errors: [
              {
                message: 'Email already registered',
                type: 'conflict',
              },
            ],
          })
        }))
  })

  afterAll(() => db.getRepository('User').clear())
})
