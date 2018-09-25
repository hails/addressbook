const request = require('supertest')

const app = require('../../../src/bin/server')
const database = require('../../../src/database')

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
      await database.User.create(userData)
    })

    test('should give a valid response with a token', () =>
      request(app)
        .post('/users/login')
        .send(userData)
        .set('Accept', 'application/json')
        .then((response) => {
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
      await database.User.create({
        email: 'who@ami.org',
        password: '123',
      })
    })

    test('should give a \'authentication\' error', () =>
      request(app)
        .post('/users/login')
        .send(userData)
        .set('Accept', 'application/json')
        .then((response) => {
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
      await database.User.create({
        email: 'get@real.org',
        password: 'strong-password',
      })
    })

    test('should give a \'authentication\' error', () =>
      request(app)
        .post('/users/login')
        .send(userData)
        .set('Accept', 'application/json')
        .then((response) => {
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

  afterAll(() => database.User.truncate())
})
