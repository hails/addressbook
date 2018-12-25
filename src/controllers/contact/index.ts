import { Router } from 'express'

import validate from '../middlewares/validation'
import authenticate from '../middlewares/authentication'
import rateLimiter from '../middlewares/rate-limit'

import contactSchema from '../schemas/contact'

import create from './create'

const router: Router = Router()

router.post(
  '/',
  authenticate,
  rateLimiter,
  validate(contactSchema),
  create
)

export = router
