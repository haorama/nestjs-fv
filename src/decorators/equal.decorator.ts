import type { RuleEqual } from "fastest-validator";
import type { TRule } from "../types";
import { addRule } from "../metadata/storage.metadata";

export function IsEqual(field: string): PropertyDecorator;
export function IsEqual(options: TRule<RuleEqual>): PropertyDecorator;

export function IsEqual(fieldOrOptions: string | TRule<RuleEqual>): PropertyDecorator {
  return (target: any, propName: string) => {
    if (typeof fieldOrOptions === "string") {
      addRule<RuleEqual>(target, propName, { type: "equal", field: fieldOrOptions});
    } else {
      addRule<RuleEqual>(target, propName, { type: "equal", ...fieldOrOptions });
    }
  };
}
