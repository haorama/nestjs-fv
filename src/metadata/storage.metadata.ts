import { CheckerFunctionV2, RuleCustom } from "fastest-validator";
import "reflect-metadata";
import { SCHEMA_KEY, SCHEMA_TYPE_KEY } from "src/constants";

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

  if (options.type === "array") {
    const item = Reflect.getMetadata(SCHEMA_TYPE_KEY, target, propName);

    if (!!item && typeof item.itemType === "function") {
      const [type] = item.itemType();
      const props = Reflect.getMetadata(SCHEMA_KEY, type.prototype);
      options.items = {
        ...item.options,
        type: "object",
        props,
      };
    }
  }

  if (options.type === "object") {
    const t = Reflect.getMetadata("design:type", target, propName);
    const props = Reflect.getMetadata(SCHEMA_KEY, t.prototype);

    if (!!props) {
      options.props = props;
    }
  }

  schema[propName] = options;

  Reflect.defineMetadata(SCHEMA_KEY, schema, target);
}
