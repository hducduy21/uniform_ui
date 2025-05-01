import { useState, FormEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/form/Input';
import CheckBox from '@/components/form/CheckBox';
import Button from '@/components/form/Button';
import Radio from '@/components/form/Radio';
import { ErrorType } from '@/types/utils';
import { RegisterFormData } from '@/types/dto';
import { EGender } from '@/types/model';
import { validateRegisterForm } from '@/utils/validate/Validate';

const Register = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    birthday: '',
    gender: EGender.MALE,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<ErrorType<RegisterFormData>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id as keyof RegisterFormData]) {
      setErrors((prev) => ({ ...prev, [id]: undefined }));
    }
  };

  const handleGenderChange = (value: EGender) => {
    setFormData((prev) => ({ ...prev, gender: value }));
  };
  
  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setErrors(validateRegisterForm(formData));
    if (Object(errors).length === 0) {
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div  className="flex items-center justify-center min-h-screen py-12 bg-gray-50">
      <div className="container max-w-3xl px-4 mx-auto">
        <div className="p-8 bg-white border border-gray-100 rounded-lg shadow-md">
          <h1 className="mb-6 text-2xl font-bold text-center">Register</h1>

          <form onSubmit={handleRegister} noValidate>
            <div className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  id="firstName"
                  label="First Name"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  error={errors.firstName}
                />
                <Input
                  id="lastName"
                  label="Last Name"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  error={errors.lastName}
                />
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  id="email"
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@domain.com"
                  required
                  error={errors.email}
                />
                <Input
                  id="phoneNumber"
                  label="Phone Number"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="+84 123456789"
                  required
                  error={errors.phoneNumber}
                />
              </div>

              {/* Birthday and Gender */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  id="birthday"
                  label="Birthday"
                  type="date"
                  value={formData.birthday}
                  onChange={handleChange}
                  required
                  error={errors.birthday}
                />
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Gender <span className="text-blue-500">*</span>
                  </label>
                  <div className="flex gap-4">
                    <Radio
                      id="male"
                      label="Male"
                      name="gender"
                      value={EGender.MALE}
                      checked={formData.gender === EGender.MALE}
                      onChange={() => handleGenderChange(EGender.MALE)}
                    />
                    <Radio
                      id="female"
                      label="Female"
                      name="gender"
                      value={EGender.FEMALE}
                      checked={formData.gender === EGender.FEMALE}
                      onChange={() => handleGenderChange(EGender.FEMALE)}
                    />
                    <Radio
                      id="other"
                      label="Other"
                      name="other"
                      value={EGender.OTHER}
                      checked={formData.gender === EGender.OTHER}
                      onChange={() => handleGenderChange(EGender.OTHER)}
                    />
                  </div>
                </div>
              </div>

              {/* Password Fields */}
              <Input
                id="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                required
                error={errors.password}
              />
              <Input
                id="confirmPassword"
                label="Confirm Password"
                type={showPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                error={errors.confirmPassword}
              />

              {/* Show Password Checkbox */}
              <CheckBox
                id="showPassword"
                label="Show password"
                checked={showPassword}
                onChange={() => setShowPassword((prev) => !prev)}
              />

              {/* Submit Button */}
              <Button type="submit" className="w-full">
                Create Account
              </Button>

              {/* Login */}
              <p className="mt-4 text-sm text-center text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-blue-600 hover:underline">
                  Log in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;