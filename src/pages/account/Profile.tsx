import type React from 'react';

import { useState } from 'react';
import Input from '@/components/form/Input';
import { ErrorType } from '@/types/utils';
import Radio from '@/components/form/Radio';
import { EGender, User } from '@/types/model';
import { validateEditProfileForm } from '@/utils/validate/Validate';

export type ProfileFormData = User

const Profile = () => {
  const [formData, setFormData] = useState<ProfileFormData>({
    id: '',
    email: '',
    phoneNumber: '',
    firstName: '',
    lastName: '',
    birthday: '',
    gender: EGender.MALE,
  });

  const [errors, setErrors] = useState<ErrorType<ProfileFormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleGenderChange = (value: EGender) => {
    setFormData((prev) => ({ ...prev, gender: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setErrors(validateEditProfileForm(formData));
    if (Object.keys(errors).length === 0) {
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
              value={formData.firstName!}
              onChange={handleChange}
              required
              error={errors.firstName}
            />
            <Input
              id='lastName'
              label='Last Name'
              type='text'
              value={formData.lastName!}
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
              value={formData.email!}
              onChange={handleChange}
              placeholder='example@domain.com'
              required
              error={errors.email}
            />
            <Input
              id='phoneNumber'
              label='Phone Number'
              type='tel'
              value={formData.phoneNumber!}
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
              value={formData.birthday!}
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
                  value={EGender.MALE}
                  checked={formData.gender === EGender.MALE}
                  onChange={() => handleGenderChange(EGender.MALE)}
                />
                <Radio
                  id='female'
                  label='Female'
                  name='gender'
                  value={EGender.FEMALE}
                  checked={formData.gender === EGender.FEMALE}
                  onChange={() => handleGenderChange(EGender.FEMALE)}
                />
                <Radio
                  id='other'
                  label='Other'
                  name='other'
                  value={EGender.OTHER}
                  checked={formData.gender === EGender.OTHER}
                  onChange={() => handleGenderChange(EGender.OTHER)}
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
