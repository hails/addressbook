class RouteNotFoundError extends Error {
  constructor (message, statusCode = 404) {
    super(message)

    this.name = 'RouteNotFoundError'
    this.type = 'not_found'
    this.statusCode = statusCode
  }
}

class ValidationError extends Error {
  constructor (message, fields, statusCode = 400) {
    super(message)

    this.name = 'ValidationError'
    this.type = 'validation'
    this.fields = fields
    this.statusCode = statusCode
  }
}

class InternalServerError extends Error {
  constructor (message, fields, statusCode = 500) {
    super(message)

    this.name = 'InternalServerError'
    this.type = 'internal'
    this.fields = fields
    this.statusCode = statusCode
  }
}

class AuthenticationError extends Error {
  constructor (message, statusCode = 403) {
    super(message)

    this.name = 'AuthenticationError'
    this.type = 'authentication'
    this.statusCode = statusCode
  }
}

class ConflictError extends Error {
  constructor (message, statusCode = 409) {
    super(message)

    this.name = 'ConflictError'
    this.type = 'conflict'
    this.statusCode = statusCode
  }
}

class RateLimitError extends Error {
  constructor (message, statusCode = 429) {
    super(message)

    this.name = 'RateLimitError'
    this.type = 'rate_limit'
    this.statusCode = statusCode
  }
}

module.exports = {
  RouteNotFoundError,
  ValidationError,
  InternalServerError,
  AuthenticationError,
  ConflictError,
  RateLimitError,
}
