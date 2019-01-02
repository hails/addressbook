import errorHandler from '../../../src/controllers/middlewares/error'
import { Request, Response } from 'express'
import IHttpError from '../../../src/helpers/errors/http-error'

describe('Error Handler', () => {
  describe('with generic error', () => {
    const error: Partial<IHttpError> = {
      code: '007',
    }

    const req: Partial<Request> = {}
    const res: Partial<Response> = {
      locals: {
        payload: {},
      },
    }
    const next = () => { }

    errorHandler(<IHttpError>error, <Request>req, <Response>res, next)

    test('should include standard error payload on `res.locals`', () => {
      expect(res.locals.payload).toMatchObject({
        type: 'error',
        statusCode: 500,
        data: [{
          message: 'Internal server error',
          type: 'internal_server_error',
          code: '007',
        }],
      })
    })
  })

  describe('with custom made error', () => {
    const error: Partial<IHttpError> = {
      type: 'fake_error',
      statusCode: 418,
      message: 'I\'m a teapot',
      code: '007',
    }

    const req: Partial<Request> = {}
    const res: Partial<Response> = {
      locals: {
        payload: {},
      },
    }
    const next = () => { }

    errorHandler(<IHttpError>error, <Request>req, <Response>res, next)

    test('should include standard error payload on `res.locals`', () => {
      expect(res.locals.payload).toMatchObject({
        type: 'error',
        statusCode: 418,
        data: [{
          message: 'I\'m a teapot',
          type: 'fake_error',
          code: '007',
        }],
      })
    })
  })

  describe('with validation error', () => {
    const error: Partial<IHttpError> = {
      type: 'validation',
      statusCode: 400,
      fields: [{
        type: 'invalid_field',
        message: 'This field is invalid',
        field: 'fake_field',
      }],
    }

    const req: Partial<Request> = {}
    const res: Partial<Response> = {
      locals: {
        payload: {},
      },
    }
    const next = () => { }

    errorHandler(<IHttpError>error, <Request>req, <Response>res, next)

    test('should include standard error payload on `res.locals`', () => {
      expect(res.locals.payload).toMatchObject({
        type: 'error',
        statusCode: 400,
        data: [{
          message: 'This field is invalid',
          type: 'invalid_field',
          field: 'fake_field',
        }],
      })
    })
  })
})
