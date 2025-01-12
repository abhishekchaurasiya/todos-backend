
import Joi from "joi";


export function registerValidatin(data) {
  const schema = Joi.object({
    user_name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      .required()
      .messages({
        "string.pattern.base":
          "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      }),
  });
  return schema.validate(data);
}

export function loginValidation(data) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
}
