import type { RuleCustom, ValidationError, Context } from "fastest-validator";
import { addRule } from "../../metadata/storage.metadata";

export function isTimeChecker(
  value: any,
  errors: ValidationError[],
  schema: any,
  path: string,
  parent?: any,
  context?: Context
) {
  const timeFormat = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
  const valid = timeFormat.test(value);

  if (!valid) {
    errors.push({
      field: path,
      type: "time",
      actual: value,
      message: "The value must be a valid time",
      expected: "time",
    });
  }

  return value;
}

export function IsTime(): PropertyDecorator {
  return (target: object, propName: string) => {
    addRule<RuleCustom>(target, propName, {
      type: "custom",
      check: isTimeChecker,
    });
  };
}
