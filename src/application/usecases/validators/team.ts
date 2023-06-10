import Joi from "joi";
import Team from "../../../domain/entities/team";
import { err_msgs } from "../../validator/err_msgs";

export const TeamValidatorSchema: Partial<Record<keyof Team, any>> = {
  name: Joi.string().max(50).min(3).required().messages(err_msgs),
  createdBy: Joi.string().required().messages(err_msgs),
};

export const UpdateTeamValidatorSchema: Partial<Record<keyof Team, any>> = {
    name: Joi.string().max(50).min(3).messages(err_msgs),
    createdBy: Joi.string().messages(err_msgs),
  };
  