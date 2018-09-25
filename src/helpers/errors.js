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

class ConflictError extends Error {
  constructor (message, statusCode = 409) {
    super(message)

    this.name = 'ConflictError'
    this.type = 'conflict'
    this.statusCode = statusCode
  }
}

module.exports = {
  RouteNotFoundError,
  ValidationError,
  InternalServerError,
  ConflictError,
}
