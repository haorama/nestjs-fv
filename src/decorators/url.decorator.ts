import type { RuleURL } from "fastest-validator";
import { addRule } from "../metadata/storage.metadata";

export function IsUrl(options?: Partial<RuleURL>): PropertyDecorator {
  return (target: any, propName: string) => {
    addRule(target, propName, { type: "url", ...options });
  };
}
