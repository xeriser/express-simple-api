import * as Joi from "joi";

const password = Joi.string().min(11).max(25);

const full_name = Joi.string().trim().min(4).max(25);

const age = Joi.number().integer().min(1).max(120);

const email = Joi.string().trim().email();

export const addUserValidator = Joi.object({
  password: password.required(),
  full_name: full_name.required(),
  email: email.required(),
  age: age.required(),
}).required();

export const updateUserValidator = Joi.object({
  password: password,
  full_name: full_name,
  email: email,
  age: age,
}).required();
