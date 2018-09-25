const responseHandler = require('../../../src/controllers/middlewares/response')

describe('ResponseHandler', () => {
  const req = {}

  describe('on error', () => {
    const errorRes = {
      locals: {
        payload: {
          type: 'error',
          statusCode: 400,
          data: 'nice_error',
        },
      },
      status: statusCode => ({
        send: obj => ({
          ...obj,
          statusCode,
        }),
      }),
    }

    const result = responseHandler(req, errorRes)

    test('should respond with correct payload', () => {
      expect(result).toEqual({
        statusCode: 400,
        errors: 'nice_error',
      })
    })
  })

  describe('on success', () => {
    describe('without a \'statusCode\' and with \'data\'', () => {
      const successRes = {
        locals: {
          payload: {
            type: 'success',
            data: 'success',
          },
        },
        status: statusCode => ({
          send: obj => ({
            ...obj,
            statusCode,
          }),
        }),
      }

      const result = responseHandler(req, successRes)

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
        status: statusCode => ({
          send: obj => ({
            ...obj,
            statusCode,
          }),
        }),
      }

      const result = responseHandler(req, successRes)

      test('should respond with correct payload', () => {
        expect(result).toEqual({
          statusCode: 201,
        })
      })
    })
  })
})
