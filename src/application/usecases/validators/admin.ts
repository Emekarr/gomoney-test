import Joi from "joi";
import Admin from "../../../domain/entities/admin";
import { err_msgs } from "../../validator/err_msgs";
import { ValidatePassword } from "../../validator/custom_validators";

export const AdminValidatorSchema: Partial<Record<keyof Admin, any>> = {
  name: Joi.string().max(50).min(3).messages(err_msgs),
  email: Joi.string().email().messages(err_msgs),
  password: Joi.string()
    .custom((value, helpers) => {
      ValidatePassword(value, () => {
        helpers.error("any.invalid");
      });
      return value;
    })
    .messages(err_msgs),
};
