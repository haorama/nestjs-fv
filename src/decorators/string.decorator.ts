import type { RuleString } from "fastest-validator";
import type { TRule } from "../types/rule.type";
import { addRule } from "../metadata/storage.metadata";

export function IsString(options?: TRule<RuleString>): PropertyDecorator {
  return (target: any, propName: string) => {
    addRule(target, propName, { type: "string", ...options });
  };
}
