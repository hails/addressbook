import Joi from 'joi'

import validationFactory from '../../../src/controllers/middlewares/validation'
import { Request, Response } from 'express'

describe('Validation middleware', () => {
  describe('with generic joi schema and valid body', () => {
    const genericSchema = {
      body: Joi.object().keys({
        email: Joi.string().email(),
        password: Joi.string(),
      }),
    }

    const req: Partial<Request> = {
      body: {
        email: 'just.a@email.com',
        password: 'just-a-password',
      },
    }

    const res: Partial<Response> = {}

    const next = <T>(payload: T) => payload

    describe('validationFactory', () => {
      const result = validationFactory(genericSchema)(<Request>req, <Response>res, next)

      test('should just call \'next\' callback', () =>
        expect(result).toBeUndefined())
    })
  })

  describe('with generic joi schema and invalid body', () => {
    const genericSchema = {
      body: Joi.object().keys({
        email: Joi.string().email(),
        password: Joi.string(),
      }),
    }

    const req: Partial<Request> = {
      body: {
        email: 123,
        password: {},
      },
    }

    const res: Partial<Response> = {}

    const next = <T>(payload: T) => payload

    describe('validationFactory', () => {
      const error = validationFactory(genericSchema)(<Request>req, <Response>res, next)

      test('should just call \'next\' with a \'ValidationError\'', () =>
        expect(error).toMatchObject({
          name: 'ValidationError',
          message: 'Invalid payload',
          type: 'validation',
          statusCode: 400,
          fields: [
            {
              message: '"email" must be a string',
              path: [
                'body',
                'email',
              ],
            },
            {
              message: '"password" must be a string',
              path: [
                'body',
                'password',
              ],
            },
          ],
        }))
    })
  })
})
