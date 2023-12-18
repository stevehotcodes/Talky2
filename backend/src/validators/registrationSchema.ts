import Joi from "joi";

export const registerUserSchema = Joi.object({
  fullName: Joi.string(),
  userName: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string(),
});