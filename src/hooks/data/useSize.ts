import useSWR from 'swr';
import sizeService from '@/services/sizeService';
import { SizesType } from '@/types/model';
import { SizeRequest } from '@/types/dto';// Ensure you have react-hot-toast installed and imported
import { toast } from 'react-toastify';

export function useSize() {
  const {
    data: sizes,
    error,
    isLoading,
    mutate,
  } = useSWR<SizesType[]>('/api/v1/size', sizeService.getSizes);

  const createSize = async (request: SizeRequest) => {
    try {
      const newSize = await sizeService.createSize(request);
      mutate();
      toast.success('Size created successfully');
      return newSize;
    } catch (error) {
      mutate(sizes, false);
      toast.error('Failed to create size');
      throw error;
    }
  };

  const updatedSize = async (id: number, request: SizeRequest) => {
    try {
      const updatedSize = await sizeService.updateSize(id, request);
      mutate();
      toast.success('Size updated successfully');
      return updatedSize;
    } catch (error) {
      mutate(sizes, false);
      toast.error('Failed to update size');
      throw error;
    }
  };

  return {
    sizes,
    isLoading,
    error,
    createSize,
    updatedSize,
  };
}