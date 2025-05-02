import { ChangeEvent } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
}

const Input = ({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  disabled = false,
  required = false,
  error,
  ...props
}: InputProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-1">
        <label htmlFor={id} className="text-sm font-bold">
          {label} {required && <span className="text-blue-500">*</span>}
        </label>
      </div>
      
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...props}
      />

      {error && (
        <p
          id={`${id}-error`}
          className="mt-1 text-sm text-red-500"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;