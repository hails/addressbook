import Joi from 'joi'

const userSchema = {
  body: Joi.object().keys({
    email: Joi.string().email({ minDomainAtoms: 2 }),
    password: Joi.string(),
  }).unknown(false),
}

export default userSchema
