import type { RuleEmail } from "fastest-validator";
import type { TRule } from "../../types/rule.type";
import { addRule } from "../../metadata/storage.metadata";

export function IsEmail(options?: TRule<RuleEmail>): PropertyDecorator {
  return (target: any, propName: string) => {
    addRule(target, propName, { type: "email", ...options });
  };
}
