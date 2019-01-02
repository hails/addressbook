import RouteNotFoundError from '../../helpers/errors/route-not-found'
import { Request, Response, NextFunction } from 'express'

const routeNotFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  if (!res.locals.payload) {
    const errorMessage = `Can't ${req.method} on route ${req.originalUrl}`
    return next(new RouteNotFoundError(errorMessage))
  }
  return next('route')
}

export default routeNotFoundHandler
