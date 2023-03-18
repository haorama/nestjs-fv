import type { ArgumentMetadata, PipeTransform } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { SCHEMA_KEY } from "./constants";
import type { WithValidator } from "./types/with-validator.interface";
import { ValidationError } from "./validation.error";
import { $validator } from "./validator";

@Injectable()
export class ValidationPipe implements PipeTransform, WithValidator {
  async transform(value: any, args: ArgumentMetadata) {
    if (args.type !== "body") {
      return value;
    }

    const schema = Reflect.getMetadata(SCHEMA_KEY, args.metatype);

    if (!!schema) {
      if (schema.$$strict === undefined) {
        schema.$$strict = "remove";
      }

      const check = this.validator().compile(schema);

      const res = await check(value);

      // mean that the validation is success
      if (typeof res === "boolean") {
        return value;
      }

      throw new ValidationError(res);
    }

    return value;
  }

  validator() {
    return $validator;
  }
}
