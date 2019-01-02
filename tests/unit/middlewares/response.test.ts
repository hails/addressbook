import { Request, Response } from 'express'
import responseHandler from '../../../src/controllers/middlewares/response'

describe('ResponseHandler', () => {
  const req: Partial<Request> = {}

  describe('on error', () => {
    const errorRes: Partial<Response> = {
      locals: {
        payload: {
          type: 'error',
          statusCode: 400,
          data: 'nice_error',
        },
      },
      status: (statusCode: number) => <Response>({
        send: (obj: object): Partial<Response> => ({
          ...obj,
          statusCode,
        }),
      }),
    }

    const result = responseHandler(<Request>req, <Response>errorRes)

    test('should respond with correct payload', () => {
      expect(result).toEqual({
        statusCode: 400,
        errors: 'nice_error',
      })
    })
  })

  describe('on success', () => {
    describe('without a \'statusCode\' and with \'data\'', () => {
      const successRes: Partial<Response> = {
        locals: {
          payload: {
            type: 'success',
            data: 'success',
          },
        },
        status: (statusCode: number) => <Response>({
          send: (obj: object): Partial<Response> => ({
            ...obj,
            statusCode,
          }),
        }),
      }

      const result = responseHandler(<Request>req, <Response>successRes)

      test('should respond with correct payload', () => {
        expect(result).toEqual({
          statusCode: 200,
          data: 'success',
        })
      })
    })

    describe('with a \'statusCode\' and without \'data\'', () => {
      const successRes = {
        locals: {
          payload: {
            type: 'success',
            statusCode: 201,
          },
        },
        status: (statusCode: number) => <Response>({
          send: (obj: object): Partial<Response> => ({
            ...obj,
            statusCode,
          }),
        }),
      }

      const result = responseHandler(<Request>req, <Response>successRes)

      test('should respond with correct payload', () => {
        expect(result).toEqual({
          statusCode: 201,
        })
      })
    })
  })
})
