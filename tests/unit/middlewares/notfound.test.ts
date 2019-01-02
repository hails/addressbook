import notFoundHandler from '../../../src/controllers/middlewares/notfound'
import RouteNotFoundError from '../../../src/helpers/errors/route-not-found'
import { Request, Response } from 'express'

describe('Not Found Handler', () => {
  const req: Partial<Request> = {
    method: 'POST',
    originalUrl: '/random/url',
  }

  const next = (input: Error): Error => input

  describe('if there is no `res.locals.payload`', () => {
    const res: Partial<Response> = {
      locals: {},
    }

    const result = <unknown>notFoundHandler(<Request>req, <Response>res, next)

    test('should trigger RouteNotFoundError', () => {
      expect(result instanceof RouteNotFoundError).toBe(true)
    })
  })

  describe('if there is `res.locals.payload`', () => {
    const res: Partial<Response> = {
      locals: {
        payload: {},
      },
    }

    const result = notFoundHandler(<Request>req, <Response>res, next)

    test('should call `next` with normal flow', () => {
      expect(result).toBe('route')
    })
  })
})
