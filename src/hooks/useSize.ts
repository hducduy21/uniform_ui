import useSWR from 'swr';
import sizeService from '@/services/sizeService';
import { SizesType } from '@/types/model';
import { SizeRequest } from '@/types/dto';

export function useSize() {
  const {
    data: sizes,
    error,
    isLoading,
    mutate,
  } = useSWR<SizesType[]>('/api/size', sizeService.getSizes);

  const createSize = async (request: SizeRequest) => {
    try {
      const newSize = await sizeService.createSize(request);
      mutate();
      return newSize;
    } catch (error) {
      mutate(sizes, false);
      throw error;
    }
  };

  const updatedSize = async (id: number, request: SizeRequest) => {
    try {
      const updatedSize = await sizeService.updateSize(id,request);
      mutate();
      return updatedSize;
    } catch (error) {
      mutate(sizes, false);
      throw error;
    }
  };

  return {
    sizes,
    isLoading,
    error,
    createSize,
    updatedSize
  };
}
