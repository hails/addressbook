import {
  authenticatedKeyGenerator,
  rateLimitHandler,
  rateLimiter,
} from '../../../src/controllers/middlewares/rate-limit'

import RateLimitError from '../../../src/helpers/errors/rate-limit'

describe.only('Rate limit', () => {
  describe('authenticatedKeyGenerator', () => {
    const res = {
      locals: {
        user: {
          id: 'an-user-id',
        },
      },
    }

    const response = authenticatedKeyGenerator(null, res)

    test('should return the user id', () =>
      expect(response).toBe('an-user-id'))
  })

  describe('rateLimitHandler', () => {
    const req = {
      rateLimit: {
        message: 'Rate limit exceeded',
      },
    }

    const next = (err) => {
      throw err
    }

    test('should call next with a RateLimitError', () =>
      expect(() => {
        rateLimitHandler(req, null, next)
      }).toThrowError(RateLimitError))
  })

  describe('rateLimiter with an user', () => {
    const req = {
      rateLimit: {},
    }

    const res = {
      locals: {
        user: {
          id: 'an-user-id',
        },
      },
    }

    const next = () => { }

    rateLimiter(req, res, next)

    test('should set req.rateLimit', () =>
      expect(req.rateLimit).toMatchObject({
        windowMs: 3600000,
        max: 3600,
      }))
  })

  describe('rateLimiter without an user', () => {
    const req = {
      rateLimit: {},
    }

    const res = {
      locals: {},
    }

    const next = () => { }

    rateLimiter(req, res, next)

    test('should set req.rateLimit', () =>
      expect(req.rateLimit).toMatchObject({
        windowMs: 3600000,
        max: 600,
      }))
  })
})
