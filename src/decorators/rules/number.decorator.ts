import type { RuleNumber } from "fastest-validator";
import type { TRule } from "../../types/rule.type";
import { addRule } from "../../metadata/storage.metadata";

/**
 * number validation
 * by default, it will convert the value to a number
 */
export function IsNumber(options?: TRule<RuleNumber>): PropertyDecorator {
  return (target: any, propName: string) => {
    addRule<RuleNumber>(target, propName, {
      type: "number",
      convert: true,
      ...options,
    });
  };
}
