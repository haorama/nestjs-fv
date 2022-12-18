import { CheckerFunctionV2, RuleCustom } from "fastest-validator";
import "reflect-metadata";

export const SCHEMA_KEY = "schema";

export function addRule<T extends RuleCustom | string | "remove" | boolean>(
  target: any,
  propName: string,
  options: T,
) {
  const schema = Reflect.getMetadata(SCHEMA_KEY, target) || {};

  // $$root, $$strict or short-hand definition rule come here
  if (typeof options === "string" || typeof options === "boolean") {
    schema[propName] = options;
    return Reflect.defineMetadata(SCHEMA_KEY, schema, target);
  }

  if (options?.requiredIf?.length >= 2) {
    options.optional = true;
    const custom: CheckerFunctionV2<any> = (
      value,
      errors,
      schema,
      name,
      parent,
      context,
    ) => {
      const [field, fieldValue] = options.requiredIf;

      const data = context?.data;

      if (data?.[field] === fieldValue && !value) {
        errors.push({ type: "required" });
      }

      return value;
    };

    options.custom = custom;
  }

  schema[propName] = options;

  Reflect.defineMetadata(SCHEMA_KEY, schema, target);
}
