jest.genMockFromModule('express-rate-limit')

class ExpressRateLimiter {
  constructor(options) {
    return (req, res, next) => {
      req.rateLimit = {
        ...options,
      }

      next()
    }
  }
}

module.exports = ExpressRateLimiter
