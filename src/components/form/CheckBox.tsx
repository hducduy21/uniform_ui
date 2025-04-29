import { ChangeEvent } from 'react';

interface CheckBoxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const CheckBox = ({ id, label, checked, onChange, disabled = false }: CheckBoxProps) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="w-4 h-4 mr-2 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
      />
      <label htmlFor={id} className="text-sm text-gray-700">
        {label}
      </label>
    </div>
  );
};

export default CheckBox;