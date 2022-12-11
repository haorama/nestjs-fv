import type { RuleDate } from "fastest-validator";
import { addRule } from "../metadata/storage.metadata";

/**
 * Decorator for adding a date rule to a property
 * by default, it will convert the value to a date
 */
export function IsDate(options?: Partial<RuleDate>): PropertyDecorator {
  return (target: any, propName: string) => {
    addRule(target, propName, { type: "date", ...options });
  };
}
