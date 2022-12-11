import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { SCHEMA_KEY } from "./metadata/storage.metadata";
import { WithValidator } from "./types/with-validator.interface";
import { ValidationError } from "./validation.error";
import { $validator } from "./validator";

@Injectable()
export class ValidationPipe implements PipeTransform, WithValidator {
  async transform(value: any, args: ArgumentMetadata) {
    const schema = Reflect.getMetadata(SCHEMA_KEY, args.metatype.prototype);

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
