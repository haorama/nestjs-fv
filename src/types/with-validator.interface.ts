import Validator from "fastest-validator";

export interface WithValidator {
  validator(): Validator;
}
