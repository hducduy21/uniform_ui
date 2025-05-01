import { ChangeEvent } from 'react';

interface RadioProps {
  id: string;
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const Radio = ({
  id,
  name,
  value,
  label,
  checked,
  onChange,
  disabled = false,
}: RadioProps) => {
  return (
    <label className="flex items-center cursor-pointer">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 disabled:cursor-not-allowed"
      />
      <span className="ml-2 text-sm text-gray-700">{label}</span>
    </label>
  );
};

export default Radio;