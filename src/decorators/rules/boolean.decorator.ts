import type { RuleBoolean } from "fastest-validator";
import { addRule } from "../../metadata/storage.metadata";

/**
 * Decorator for adding a boolean rule to a property
 * by default, it will convert the value to a boolean
 * @see https://github.com/icebob/fastest-validator#boolean
 */
export function IsBoolean(options?: Partial<RuleBoolean>): PropertyDecorator {
  return (target: any, propName: string) => {
    addRule(target, propName, { type: "boolean", ...options });
  };
}
