import FastestValidator from "fastest-validator";

export const $validator = new FastestValidator({
  useNewCustomCheckerFunction: true,
  messages: {
    arrayEmpty: "The {field} field cannot be empty.",
    arrayEnum: "The {field} field must be one of the following values: {expected}.",

    equalField: "The {field} field does not match with {expected} field.",

    required: "The {field} field is required.",

    email: "The {field} field must be a valid email.",

    string: "The {field} field must be a string.",
    stringEnum: "The {field} field must be one of the following values: {expected}.",
    stringMin: "The {field} field must be at least {expected} characters.",
    stringMax: "The {field} field must be at most {expected} characters.",
    stringEmpty: "The {field} field cannot be empty.",
    stringAlphadash: "the {field} field must contain only letters and dashes.",

    number: "The {field} field must be a number.",

    array: "The {field} field must be an array.",
    arrayMax: "The {field} field must have a maximum of {expected} items.",

    boolean: "The {field} field must be a boolean.",

    date: "The {field} field must be a date.",

    object: "The {field} field must be an object.",

    url: "The {field} field must be a valid URL.",
  },
});
