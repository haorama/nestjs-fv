# nestjs-fv
Fastest validator for nestjs

## Features
- Class Validation (similar to class-validator)
- built-in validation pipe

## Installation
```
npm install @haorama/nestjs-fv
```
or
```
yarn add @haorama/nestjs-fv
```

## Usage
Create your class and put some validation decorators on the properties you want to validate:

```ts
import { IsString, IsNumber, IsEmail } from "@haorama/nestjs-fv"

export class CreateUserDTO {
  @IsString()
  name: string

  @IsEmail()
  email: string;

  @IsNumber()
  age: number;
}
```

and somewhere in your controller

```ts
import { ValidationPipe } from "@haorama/nestjs-fv";
import { CreateUserDTO } from "./create-user.dto";
import { Controller, UsePipes, Post, Body } from "@nestjs/common";

@Controller("users")
@UsePipes(ValidationPipe)
export class UserController {
  @Post()
  async create(@Body() data: CreateUserDTO) {
    return data;
  }
}
```

Notice that you'll received unhandled exceptions, next step is to create exception filter to sends an appropriate user-friendly response.

Also noted that validation pipe by default add $$strict = "remove" if there is no `$$strict` prop defined in your class schema.
you can overwrite or use your own validation pipe to modify the behavior.

```ts
import { ValidationError } from "@haorama/nestjs-fv";
import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Response } from "express"; // change this if you're using fastify

@Catch(ValidationError)
export class ValidationExceptionFilter
  implements ExceptionFilter<ValidationError>
{
  catch(exception: ValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    const errors = exception.errors.map((error) => ({
      field: error.field,
      message: error.message,
    }));

    return res.status(422).json({
      message: "Unprocessable Entity",
      statusCode: 422,
      errors,
    });
  }
}
```

and add exception filters into our `UserController`:

```ts
import { ValidationPipe } from "@haorama/nestjs-fv";
import { CreateUserDTO } from "./create-user.dto";
import { ValidationExceptionFilter } from "./validation-exception.filter";
import { Controller, UsePipes, Post, Body, UseFilters } from "@nestjs/common";

@Controller("users")
@UsePipes(ValidationPipe)
@UseFilters(ValidationExceptionFilter)
export class UserController {
  @Post()
  async create(@Body() data: CreateUserDTO) {
    return data;
  }
}
```

### `@IsArray`
This is an `array` validator.

```ts
import { IsArray } from "@haorama/nestjs-fv";

export class CreateUserDTO {
  @IsArray({ items: "string" })
  roles: string[];

  // OR
  @IsArray({ items: { type: "string", enum: ["editor", "viewer"]} })
  roles: string[];
}
```

### `@IsBoolean`
This is an `boolean` validator, by default value will be converted to `boolean` (1,0, on, off, "true", "false")

```ts
import { IsBoolean } from "@haorama/nestjs-fv";

export class CreateUserDTO {
  @IsBoolean()
  subscribed: boolean;
}
```

### `@IsDate`
This is an `date` validator, by default value will be `convert` to `Date`

```ts
import { IsDate } from "@haorama/nestjs-fv";

export class CreatePostDTO {
  @IsDate()
  created: Date;
}
```

### `@IsEmail`
This is an `email` validator

```ts
import { IsEmail } from "@haorama/nestjs-fv";

export class CreateUserDTO {
  @IsEmail()
  email: string;
}
```

### `@IsEqual`
This is an `equal` validator.

```ts
import { IsString, IsEqual } from "@haorama/nestjs-fv";

export class CreateUserDTO {
  @IsString()
  password: string;

  @IsEqual("password")
  confirm_password: string;

  @IsEqual({ value: true, strict: true }) // this also worked
  agreeTerms: boolean;
}
```

### `@IsNumber`
This is an `number` validator, by default value will be converted to number.

```ts
import { IsNumber } from "@haoarama/nestjs-fv";

export class CreateUserDTO {
  @IsNumber()
  age: number;
}
```

### `@IsObject`
This is an `object` validator

```ts
import { IsObject } from "@haorama/nestjs-fv";

export class CreateUserDTO {
  @IsObject({
    strict: "remove", //true, false, remove
    props: {
      street: "string", //string short-hand definition
      city: { type: "string" },
      zip: { type: "number" }
    }
  })
  address: Record<string, any>; //or you can replace with class or interface ( because we dont support nested schema yet)
}
```

### `@IsString`
This is an `string` validator.

```ts
import { IsString } from "@haorama/nestjs-fv";
export class CreateUserDTO {
  @IsString({convert: false, empty: true})
  name: string;
}
```

### `@IsUrl`
This is an `url` validator

```ts
import { IsUrl } from "@haorama/nestjs-fv";

export class CreateProfileDTO {
  @IsUrl()
  github_url: string;
}
```

### Unsupported Rule
For now we dont add all rules from `fastest-validator`, but you can still use it by using `IsRule` decorator:

```ts
import {IsRule, IsString} from "@haorama/nestjs-fv";

export class LoginDTO {
  @IsString({ min: 8 })
  password: string;

  @IsRule({ type: "equal", field: "password" })
  password_confirmation: string;
}
```

## Error / Validation Messages
by default we overwrite some of the fastest-validator default messages. removing `'field'` inside `field` placeholder.
you can check the overwrite messages here [https://github.com/haorama/nestjs-fv/blob/main/src/validator.ts](https://github.com/haorama/nestjs-fv/blob/main/src/validator.ts)


## TODO
- Add more decorators provided by fastest-validator
- Support Nested Schema
