import IHttpError from './http-error'

export default class ConflictError extends Error implements IHttpError {
  message!: string
  name: string
  type: string
  statusCode: number

  constructor(message: string, statusCode: number = 409) {
    super(message)

    this.name = 'ConflictError'
    this.type = 'conflict'
    this.statusCode = statusCode
  }
}
