const responseHandler = (req, res) => {
  const { payload } = res.locals

  if (payload.type === 'error') {
    return res.status(payload.statusCode).send({
      errors: payload.data,
    })
  }

  const statusCode = payload.statusCode ?
    payload.statusCode :
    200

  const response = payload.data ?
    { data: payload.data } :
    {}

  return res.status(statusCode).send(response)
}

module.exports = responseHandler
