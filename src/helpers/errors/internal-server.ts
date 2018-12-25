import IHttpError from './http-error'

export default class InternalServerError extends Error implements IHttpError {
  name: string
  type: string
  statusCode: number

  constructor () {
    super('Something went wrong')

    this.name = 'InternalServerError'
    this.type = 'internal'
    this.statusCode = 500
  }
}
