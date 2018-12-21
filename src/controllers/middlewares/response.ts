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
    null

  return res.status(statusCode).send(response)
}

export default responseHandler
