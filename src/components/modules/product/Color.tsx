import { ColorType } from '@/types/model';

type ColorComponentSize = Record<'md' | 'xl', string>;

const ColorSize: ColorComponentSize = {
  md: 'h-5 w-5',
  xl: 'h-8 w-8',
};

interface ColorComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  item?: ColorType;
  size?: keyof ColorComponentSize;
  color?: string;
  checked?: boolean;
};

export default function Color({ size = 'md', item, color, checked = false, ...props }: ColorComponentProps) {
  return (
    <div
      className={`${ColorSize[size]} border ${checked ? 'border-4 border-slate-500 shadow-md scale-105' : 'border-gray-100'} rounded-full`}
      style={{ backgroundColor: color || item?.hexCode }}
      {...props}
    />
  );
}
