const Joi = require('joi')

const contact = {
  body: Joi.object().keys({
    name: Joi.string().optional(),
    email: Joi.string().email({ minDomainAtoms: 2 }).optional(),
    phone_number: Joi.string().min(1).max(15).optional(),
    country: Joi.string().max(3).optional(),
  }).min(1),
}

module.exports = {
  contact,
}
