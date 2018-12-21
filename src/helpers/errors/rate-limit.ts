import IHttpError from './http-error'

export default class RateLimitError extends Error implements IHttpError {
  message: string
  name: string
  type: string
  statusCode: number

  constructor (message: string, statusCode: number = 429) {
    super(message)

    this.name = 'RateLimitError'
    this.type = 'rate_limit'
    this.statusCode = statusCode
  }
}
