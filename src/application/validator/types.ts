export interface ClassValidatorInterface {
  validate(schema: any, payload: any): ClassValidationResult<any, any>;
  validator: any;
}

export interface ClassValidationResult<E, T> {
  err?: E;
  payload?: T;
}
