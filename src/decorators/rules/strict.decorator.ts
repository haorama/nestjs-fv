import { addRule } from "../../metadata/storage.metadata";

type RuleStrict = boolean | "remove";

/**
 * Strict rule, you can also use IsRule to define strict rule
 */
export function IsStrict(value: RuleStrict): PropertyDecorator {
  return (target: any, propName: string) => {
    addRule<RuleStrict>(target, propName, value);
  };
}
