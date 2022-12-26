import type { RuleObject } from "fastest-validator";
import { addRule } from "../../metadata/storage.metadata";

/**
 * Decorator for adding an object rule to a property
 * for now, object rule does not support nested rules
 * you must apply object props inside this decorator
 */
export function IsObject(options?: Partial<RuleObject>): PropertyDecorator {
  return (target: any, propName: string) => {
    addRule(target, propName, { type: "object", ...options });
  };
}
