import Joi from 'joi'

const contactSchema = {
  body: Joi.object().keys({
    name: Joi.string().optional(),
    email: Joi.string().email({ minDomainAtoms: 2 }).optional(),
    phone_number: Joi.string().min(1).max(15).optional(),
    country: Joi.string().max(3).optional(),
  }).unknown(false).min(1),
}

export default contactSchema
