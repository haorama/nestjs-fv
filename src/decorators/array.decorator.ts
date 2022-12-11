import type { RuleArray } from "fastest-validator";
import { addRule } from "../metadata/storage.metadata";

export function IsArray(options?: Partial<RuleArray>): PropertyDecorator {
  return (target: any, propName: string) => {
    addRule(target, propName, { type: "array", ...options });
  };
}
