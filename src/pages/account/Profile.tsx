import type React from 'react';

import { useState } from 'react';
import Input from '@/components/form/Input';
import { ErrorType } from '@/types/type';
import Radio from '@/components/form/Radio';

interface AccountProfileData {
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  birthday: string;
  gender: 'MALE' | 'FEMALE';
}

const Profile = () => {
  const [formData, setFormData] = useState<AccountProfileData>({
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    birthday: '',
    gender: 'MALE',
  });

  const [errors, setErrors] = useState<ErrorType<AccountProfileData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleGenderChange = (value: 'MALE' | 'FEMALE') => {
    setFormData((prev) => ({ ...prev, gender: value }));
  };

  const validateForm = (): boolean => {
    const newErrors: ErrorType<AccountProfileData> = {};

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phoneNumber.match(/^\+?[\d\s-]{10,}$/)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.birthday) {
      newErrors.birthday = 'Birthday is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-xl font-bold'>EDIT PROFILE</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className='space-y-6'>
          {/* Personal Information */}
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <Input
              id='firstName'
              label='First Name'
              type='text'
              value={formData.firstName}
              onChange={handleChange}
              required
              error={errors.firstName}
            />
            <Input
              id='lastName'
              label='Last Name'
              type='text'
              value={formData.lastName}
              onChange={handleChange}
              required
              error={errors.lastName}
            />
          </div>

          {/* Contact Information */}
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <Input
              id='email'
              label='Email Address'
              type='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='example@domain.com'
              required
              error={errors.email}
            />
            <Input
              id='phoneNumber'
              label='Phone Number'
              type='tel'
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder='+84 123456789'
              required
              error={errors.phoneNumber}
            />
          </div>

          {/* Birthday and Gender */}
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <Input
              id='birthday'
              label='Birthday'
              type='date'
              value={formData.birthday}
              onChange={handleChange}
              required
              error={errors.birthday}
            />
            <div>
              <label className='block mb-1 text-sm font-medium text-gray-700'>
                Gender <span className='text-blue-500'>*</span>
              </label>
              <div className='flex gap-4'>
                <Radio
                  id='male'
                  label='Male'
                  name='gender'
                  value='MALE'
                  checked={formData.gender === 'MALE'}
                  onChange={() => handleGenderChange('MALE')}
                />
                <Radio
                  id='female'
                  label='Female'
                  name='gender'
                  value='FEMALE'
                  checked={formData.gender === 'FEMALE'}
                  onChange={() => handleGenderChange('FEMALE')}
                />
              </div>
            </div>
          </div>
        </div>

        <button type='submit' className='px-6 py-3 font-medium text-white uppercase bg-black'>
          Save changes
        </button>
      </form>
    </div>
  );
};

export default Profile;
