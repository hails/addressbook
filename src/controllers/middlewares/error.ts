const errorHandler = (err, req, res, next) => {
  if (err.type === 'validation') {
    res.locals.payload = {
      type: 'error',
      statusCode: err.statusCode,
      data: err.fields.map(error => ({ type: err.type, ...error })),
    }
  } else {
    res.locals.payload = {
      type: 'error',
      statusCode: err.statusCode || 500,
      data: [
        {
          message: err.message || 'Internal server error',
          type: err.type || 'internal_server_error',
          code: err.code,
        },
      ],
    }
  }

  return next('route')
}

export default errorHandler
