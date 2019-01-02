import { Request, Response } from 'express'

const responseHandler = (req: Request, res: Response) => {
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
    undefined

  return res.status(statusCode).send(response)
}

export default responseHandler
