const Joi = require('joi')

const user = {
  body: Joi.object().keys({
    email: Joi.string().email({ minDomainAtoms: 2 }),
    password: Joi.string(),
  }).unknown(false),
}

module.exports = {
  user,
}
