import RateLimit = require('express-rate-limit')
import { Request, Response, NextFunction, RequestHandler } from 'express'

import RateLimitError from '../../helpers/errors/rate-limit'

export const authenticatedKeyGenerator = (req: Request, res: Response): string =>
  res.locals.user.id

export const rateLimitHandler: RequestHandler =
  (req: Request, res: Response, next: NextFunction) =>
    next(new RateLimitError('Too many requests, please try again later.'))

const unauthenticatedLimiter = new RateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 600,
  handler: rateLimitHandler,
})

const authenticatedLimit = new RateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3600,
  keyGenerator: authenticatedKeyGenerator,
  handler: rateLimitHandler,
})

export const rateLimiter = (req: Request, res: Response, next: NextFunction) => {
  if (res.locals.user) {
    return authenticatedLimit(req, res, next)
  }

  return unauthenticatedLimiter(req, res, next)
}
