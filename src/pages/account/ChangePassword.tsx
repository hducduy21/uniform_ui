"use client"

import CheckBox from "@/components/form/CheckBox"
import Input from "@/components/form/Input"
import { ErrorType } from "@/types/type"
import type React from "react"

import { ChangeEvent, useState } from "react"
import { Link } from "react-router-dom"

interface ChangePasswordFormData {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}

const ChangePassword = () => {
  const [formData, setFormData] = useState<ChangePasswordFormData>({
      currentPassword: '',
      password: '',
      confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<ErrorType<ChangePasswordFormData>>({})

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setFormData((prev) => ({ ...prev, [id]: value }));
      if (errors[id as keyof ChangePasswordFormData]) {
        setErrors((prev) => ({ ...prev, [id]: undefined }));
      }
  };

  const validateForm = (): boolean => {
    const newErrors: ErrorType<ChangePasswordFormData> = {};
    
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      console.log('Form submitted:', formData);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">CHANGE MY PASSWORD</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="currentPassword" className="block mb-2 text-sm font-bold">
            CURRENT PASSWORD
          </label>
          <Input
              id="currentPassword"
              label="Current Password"
              type={showPassword ? 'text' : 'password'}
              value={formData.currentPassword}
              onChange={handleChange}
              required
              error={errors.currentPassword}
          />
          <Link to="/forgot-password" className="inline-block mt-1 text-sm font-bold">
            FORGOT YOUR PASSWORD?
          </Link>
        </div>

        <div className="mb-6">
          <label htmlFor="newPassword" className="block mb-2 text-sm font-bold">
            NEW PASSWORD <span className="text-blue-600">*</span>
          </label>
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
        </div>

        <div className="mb-6">
          <CheckBox
            id="showPassword"
            label="Show password"
            checked={showPassword}
            onChange={() => setShowPassword((prev) => !prev)}
          />
        </div>

        <div className="flex justify-end">
          <button type="submit" className="px-6 py-3 font-medium text-white uppercase bg-black">
            Change my password
          </button>
        </div>
      </form>
    </div>
  )
}

export default ChangePassword
