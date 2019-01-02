import request, { Response } from 'supertest'

import app from '../../../src/server'
import * as database from '../../../src/database'
import { User } from '../../../src/database/entities/User'

describe('User login', () => {
  beforeAll(async () => {
    await database.bootstrap()
  })

  describe('POST `/users/login` with valid user data', () => {
    const userData = {
      email: 'root@root.org',
      password: 'toor',
    }

    beforeAll(async () => {
      const user = new User()
      user.email = userData.email
      user.password = userData.password

      await user.save()
    })

    test('should give a valid response with a token', () =>
      request(app)
        .post('/users/login')
        .send(userData)
        .set('Accept', 'application/json')
        .then((response: Response) => {
          expect(response).toHaveProperty('status', 200)
          expect(response.body).toHaveProperty('data.token')
        }))
  })

  describe('POST `/users/login` with incorrect email', () => {
    const userData = {
      email: 'incorrect@email.org',
      password: '123',
    }

    beforeAll(async () => {
      const user = new User()
      user.email = 'who@ami.org'
      user.password = '123'

      await user.save()
    })

    test('should give a \'authentication\' error', () =>
      request(app)
        .post('/users/login')
        .send(userData)
        .set('Accept', 'application/json')
        .then((response: Response) => {
          expect(response).toHaveProperty('status', 403)
          expect(response.body).toEqual({
            errors: [
              {
                message: 'Email or password incorrect',
                type: 'authentication',
              },
            ],
          })
        }))
  })

  describe('POST `/users/login` with incorrect password', () => {
    const userData = {
      email: 'get@real.org',
      password: 'incorrect-password',
    }

    beforeAll(async () => {
      const user = new User()
      user.email = 'get@real.org'
      user.password = 'strong-password'

      await user.save()
    })

    test('should give a \'authentication\' error', () =>
      request(app)
        .post('/users/login')
        .send(userData)
        .set('Accept', 'application/json')
        .then((response: Response) => {
          expect(response).toHaveProperty('status', 403)
          expect(response.body).toEqual({
            errors: [
              {
                message: 'Email or password incorrect',
                type: 'authentication',
              },
            ],
          })
        }))
  })

  afterAll(() => User.clear())
})
