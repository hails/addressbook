jest.genMockFromModule('express-rate-limit')

const handler = options => (req, res, next) => {
  req.rateLimit = {
    ...options,
  }

  next()
}

module.exports = handler
