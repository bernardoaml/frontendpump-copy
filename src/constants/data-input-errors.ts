export const invalidType = 'Invalid data type';

export const noEmpty = 'Field cannot be empty';

export const required = 'Field is required';

export const zBaseErrors = {
  invalid_type_error: invalidType,
  required_error: required,
};

export const notAllowed = 'Value not allowed';

export const bool = 'Only boolean values are accepted';

export const string = 'Only strings are accepted';

export const number = 'Only numbers are accepted';

export function oneOf(v: Array<string | number>) {
  return `Only values allowed: [${v.join(', ')}]`;
}

export const email = 'Please enter a valid email';

export const phone = 'Please enter a valid phone number';

export const login = 'Please enter a valid login identifier';

export const password = 'Please enter a valid password';

export const samePasswords = 'Passwords must match';

export const invalidMethod = 'Invalid input method';

export const select1 = 'Please select an option';

export const selectAtLeast1 = 'Please select at least one option';

export const invalidFile = 'Invalid file';

export const noChangedFields = 'No fields changed';

export function minChar(v: number) {
  return `Minimum ${v} character${v > 1 ? 's' : ''}`;
}

export function maxChar(v: number) {
  return `Maximum ${v} character${v > 1 ? 's' : ''}`;
}

export function minNumber(v: number) {
  return `Minimum value is ${v}`;
}

export function maxNumber(v: number) {
  return `Maximum value is ${v}`;
}
