import { ColorType } from "@/types/interface";

type ColorComponentSize = Record<'md' | 'xl', string>;

const ColorSize: ColorComponentSize = {
  md: 'h-5 w-5',
  xl: 'h-8 w-8'
};

type ColorComponentProps = {
    item: ColorType
    size?: keyof ColorComponentSize
}

export default function Color({ size='md', item }:  ColorComponentProps) {
  return (
    <div className={`${ColorSize[size]} rounded-full border border-gray-300`} style={{backgroundColor: item.hexCode}} />
  );
}