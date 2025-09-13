const Joi = require('joi');

const geoSchema = Joi.object({
  lat: Joi.number().required(),
  lng: Joi.number().required()
});

const addressSchema = Joi.object({
  street: Joi.string().allow('').optional(),
  city: Joi.string().required(),
  zipcode: Joi.string().required(),
  geo: geoSchema.required()
});

const companySchema = Joi.object({
  name: Joi.string().required()
});

const createUserSchema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().allow('').optional(),
  company: companySchema.required(),
  address: addressSchema.required()
});

const updateUserSchema = createUserSchema.fork(['email', 'name', 'company', 'address'], (s) => s.optional());

module.exports = { createUserSchema, updateUserSchema };
