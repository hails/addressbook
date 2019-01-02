import IHttpError from './http-error'

export default class RouteNotFoundError extends Error implements IHttpError {
  message!: string
  name: string
  type: string
  statusCode: number

  constructor(message: string, statusCode: number = 404) {
    super(message)

    this.name = 'RouteNotFoundError'
    this.type = 'not_found'
    this.statusCode = statusCode
  }
}
