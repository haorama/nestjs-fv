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

### `@IsString`
This is an `string` validator. all `string` validation from fastest validator are available by passing object arguments.

Internally inside `ValidationPipe`, we already create `fastest-validator` instance that by default add `empty:false` and `convert:true` inside string rule, you can overwrite default options by adding string options to the `IsString` arguments

```ts
import { IsString } from "@haorama/nestjs-fv";
export class CreateUserDTO {
  @IsString({convert: false, empty: true})
  name: string;
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
