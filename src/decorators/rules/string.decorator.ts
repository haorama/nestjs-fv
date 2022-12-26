import type { RuleString } from "fastest-validator";
import type { TRule } from "../../types/rule.type";
import { addRule } from "../../metadata/storage.metadata";

export function IsString(options?: TRule<RuleString>): PropertyDecorator {
  return (target: any, propName: string) => {
    addRule<RuleString>(target, propName, {
      type: "string",
      convert: true,
      ...options,
    });
  };
}
