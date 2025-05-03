import { ColorType } from "@/types/model";

type ColorComponentSize = Record<'md' | 'xl', string>;

const ColorSize: ColorComponentSize = {
  md: 'h-5 w-5',
  xl: 'h-8 w-8'
};

type ColorComponentProps = {
    item?: ColorType
    size?: keyof ColorComponentSize
    color?: string
}

export default function Color({ size='md', item, color }:  ColorComponentProps) {
  return (
    <div className={`${ColorSize[size]} rounded-full border border-gray-300`} style={{backgroundColor: color || item?.hexCode}} />
  );
}