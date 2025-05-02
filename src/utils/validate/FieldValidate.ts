import { ErrorType } from "@/types/utils";
export type Validator<T> = (formData: T) => ErrorType<T>;

export const emailValidator = <T extends { email: string }>(formData: T): ErrorType<T> => {
  const errors: ErrorType<T> = {};
  if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    errors.email = 'Please enter a valid email address';
  }
  return errors;
};

export const passwordValidator = <T extends { password: string }>(formData: T): ErrorType<T> => {
  const errors: ErrorType<T> = {};
  if (formData.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }
  return errors;
};

export const phoneNumberValidator = <T extends { phoneNumber: string }>(formData: T): ErrorType<T> => {
  const errors: ErrorType<T> = {};
  if (!formData.phoneNumber.match(/^\+?[\d\s-]{10,}$/)) {
    errors.phoneNumber = 'Please enter a valid phone number';
  }
  return errors;
};

export const confirmPasswordValidator = <T extends { password: string; confirmPassword: string }>(
  formData: T
): ErrorType<T> => {
  const errors: ErrorType<T> = {};
  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  return errors;
};

export const requiredFieldValidator = <T, K extends keyof T>(field: K, errorMessage: string) => (
  formData: T
): ErrorType<T> => {
  const errors: ErrorType<T> = {};
  if (!formData[field] || (typeof formData[field] === 'string' && !formData[field].trim())) {
    errors[field] = errorMessage;
  }
  return errors;
};

export const combineValidators = <T>(...validators: Validator<T>[]): Validator<T> => (formData: T) => {
  return validators.reduce((errors, validator) => ({ ...errors, ...validator(formData) }), {} as ErrorType<T>);
};
