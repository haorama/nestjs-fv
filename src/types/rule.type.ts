import { RuleCustom } from "fastest-validator";

export type AdditionalRule = {
  /**
   * If this argument is defined, it will create custom function to validate the value.
   * first argument is the the property of other field
   * second argument is the value of other field.
   */
  requiredIf?: [string, any];
};

// TODO: use OMIT?
export type TRule<T extends RuleCustom> = Partial<T> & AdditionalRule;
