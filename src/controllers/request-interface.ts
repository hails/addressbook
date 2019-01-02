import { Request } from 'express'

interface IEscribaRequest extends Request {
  id?: string
}

export default IEscribaRequest
