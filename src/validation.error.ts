import { ValidationError as FastestValidationError } from "fastest-validator";

export class ValidationError {
  public errors: FastestValidationError[];

  constructor(errors: FastestValidationError[]) {
    this.errors = errors;
  }
}
