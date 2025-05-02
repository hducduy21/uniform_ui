import { ChangePasswordFormData } from "@/pages/account/ChangePassword";
import { ProfileFormData } from "@/pages/account/Profile";
import { LoginCredentials, RegisterFormData } from "@/types/dto";
import { combineValidators, confirmPasswordValidator, emailValidator, passwordValidator, phoneNumberValidator, requiredFieldValidator, Validator } from "@/utils/validate/FieldValidate";

export const validateRegisterForm: Validator<RegisterFormData> = combineValidators(
  emailValidator,
  passwordValidator,
  phoneNumberValidator,
  confirmPasswordValidator,
  requiredFieldValidator('firstName', 'First name is required'),
  requiredFieldValidator('lastName', 'Last name is required'),
  requiredFieldValidator('birthday', 'Birthday is required')
);

export const validateLoginForm: Validator<LoginCredentials> = combineValidators(
  requiredFieldValidator('password', 'Password is required'),
  emailValidator
);

export const validateEditProfileForm: Validator<ProfileFormData> = combineValidators(
  emailValidator,
  phoneNumberValidator,
  requiredFieldValidator('firstName', 'First name is required'),
  requiredFieldValidator('lastName', 'Last name is required'),
  requiredFieldValidator('birthday', 'Birthday is required')
);

export const validateChangePasswordForm: Validator<ChangePasswordFormData> = combineValidators(
  passwordValidator,
  confirmPasswordValidator,
  requiredFieldValidator('currentPassword', 'Current password is required'),
);
