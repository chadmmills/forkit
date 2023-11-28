type ValidationRule = boolean;
export type ValidationErrors = Record<string, string[]>;

type Schema = Record<string, ValidationRule>;

export default function validate(schema: Schema, formData: FormData) {
  let fields = Object.keys(schema);
  let isValid = true;
  let errors: ValidationErrors = {};

  fields.forEach((field) => {
    let rule = schema[field];
    let value = formData.get(field);

    if (rule && typeof rule === "boolean") {
      if (!value) {
        isValid = false;
        errors[field] = ["is required"];
      }
    }
  });

  return { isValid, isInValid: !isValid, errors };
}
