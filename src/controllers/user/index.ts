import { Router } from 'express'

import validate from '../middlewares/validation'

import userSchema from '../schemas/user'

import { rateLimiter } from '../middlewares/rate-limit'

import createHandler from './create'
import loginHandler from './login'

const router: Router = Router()

router.post(
  '/',
  rateLimiter,
  validate(userSchema),
  createHandler
)

router.post(
  '/login',
  rateLimiter,
  validate(userSchema),
  loginHandler
)

export = router
