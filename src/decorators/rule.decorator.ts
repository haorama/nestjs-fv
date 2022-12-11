import type { ValidationRule } from "fastest-validator";
import { addRule } from "../metadata/storage.metadata";

/**
 * Decorator for adding a validation rule to a property
 */
export function IsRule(options: ValidationRule): PropertyDecorator {
  return (target: any, propName: string) => {
    addRule(target, propName, options);
  };
}
