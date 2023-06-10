import joi, { ValidationError, ValidationResult, object } from "joi";
import { ClassValidationResult, ClassValidatorInterface } from "./types";
import { err_msgs } from "./err_msgs";

export default class JoiValidator implements ClassValidatorInterface {
  readonly validator = joi;

  validate<T>(
    schema: object,
    payload: any
  ): ClassValidationResult<ValidationError, T> {
    const result = this.validator
      .object(schema)
      .validate(payload) as ValidationResult<T>;
    return {
      err: result.error,
      payload: result.value,
    };
  }
}
