import IHttpError from './http-error'

export default class ValidationError extends Error implements IHttpError {
  message: string
  name: string
  type: string
  fields: Object[]
  statusCode: number

  constructor(message: string, fields: Object[], statusCode: number = 400) {
    super(message)

    this.name = 'ValidationError'
    this.type = 'validation'
    this.fields = fields
    this.statusCode = statusCode
  }
}
