import IHttpError from './http-error'

export default class AuthenticationError extends Error implements IHttpError {
  name: string
  type: string
  statusCode: number

  constructor (message: string, statusCode: number = 403) {
    super(message)

    this.name = 'AuthenticationError'
    this.type = 'authentication'
    this.statusCode = statusCode
  }
}
