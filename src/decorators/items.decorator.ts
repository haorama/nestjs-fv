import type { RuleObject } from "fastest-validator";
import { TItemType } from "src/types";
import { SCHEMA_TYPE_KEY } from "../metadata/storage.metadata";

/**
 * Items decorator for array rule
 * this param worked object type only
 */
export function Items(
  itemType: () => [TItemType],
  options?: Partial<RuleObject>
): PropertyDecorator {
  return (target: any, propName: string) => {
    Reflect.defineMetadata(
      SCHEMA_TYPE_KEY,
      { itemType, options },
      target,
      propName
    );
  };
}
