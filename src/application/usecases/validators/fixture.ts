import Joi from "joi";
import Fixture from "../../../domain/entities/fixture";
import { err_msgs } from "../../validator/err_msgs";

export const FixtureValidatorSchema: Partial<Record<keyof Fixture, any>> = {
  name: Joi.string().max(50).min(3).required().messages(err_msgs),
  createdBy: Joi.string().required().messages(err_msgs),
  teamTwoID: Joi.string().required().messages(err_msgs),
  teamTwoName: Joi.string().max(50).required().messages(err_msgs),
  teamOneID: Joi.string().required().messages(err_msgs),
  teamOneName: Joi.string().max(50).required().messages(err_msgs),
};

export const UpdateFixtureValidatorSchema: Partial<Record<keyof Fixture, any>> =
  {
    name: Joi.string().max(50).min(3).messages(err_msgs),
    teamTwoID: Joi.string().messages(err_msgs),
    teamTwoName: Joi.string().max(50).messages(err_msgs),
    teamOneID: Joi.string().messages(err_msgs),
    teamOneName: Joi.string().max(50).messages(err_msgs),
    completed: Joi.boolean().messages(err_msgs),
  };
