import rateLimit from 'express-rate-limit'
import { Request, Response, NextFunction } from 'express'

import RateLimitError from '../../helpers/errors/rate-limit'

export const authenticatedKeyGenerator = (req, res) =>
  res.locals.user.id

export const rateLimitHandler =
  (req, res, next) =>
    next(new RateLimitError('Too many requests, please try again later.'))

const unauthenticatedLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 600,
  handler: rateLimitHandler,
  skipSuccessfulRequests: true,
})

const authenticatedLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3600,
  keyGenerator: authenticatedKeyGenerator,
  handler: rateLimitHandler,
  skipSuccessfulRequests: true,
})

export const rateLimiter = (req, res, next) => {
  if (res.locals.user) {
    return authenticatedLimit(req, res, next)
  }

  return unauthenticatedLimiter(req, res, next)
}

export default rateLimiter
