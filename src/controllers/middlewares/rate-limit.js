const rateLimit = require('express-rate-limit')

const {
  RateLimitError,
} = require('../../helpers/errors')

const authenticatedKeyGenerator = (req, res) =>
  res.locals.user.id

const rateLimitHandler = (req, res, next) =>
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

const rateLimiter = (req, res, next) => {
  if (res.locals.user) {
    return authenticatedLimit(req, res, next)
  }

  return unauthenticatedLimiter(req, res, next)
}

module.exports = {
  authenticatedKeyGenerator,
  rateLimitHandler,
  rateLimiter,
}
