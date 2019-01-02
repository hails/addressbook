import request, { Response } from 'supertest'

import app from '../../../src/server'

describe('Contact creation', () => {
  describe('POST `/contacts` with valid contact data', () => {
    const contactData = {
      email: 'some@email.com',
      phone_number: '+55119999999',
    }

    test('should give a valid response', () =>
      request(app)
        .post('/contacts')
        .send(contactData)
        .set('Accept', 'application/json')
        .then((response: Response) => {
          expect(response).toHaveProperty('status', 204)
          expect(response.body).toEqual({})
        }))
  })
})
