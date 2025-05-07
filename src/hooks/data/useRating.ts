import ratingService from '@/services/ratingService';
import { toast } from 'react-toastify';
import useSWR from 'swr';

export function useRating(id: string) {
  const { data: myRating, error, isLoading, mutate } = useSWR<number>(
    `/ratings${'?productId='+id}`,
    ratingService.getRating,
  );

  const rateProduct = async ({productId, rating}: {productId: string, rating: number}) => {
    try {
      const response = await ratingService.rating({ productId, rating });
      toast.success('Rating successfully');
      return response;
    } catch (error) {
      throw new Error('Rating failed, please try again');
    }
  }

  return {
    myRating,
    isLoading,
    error,
    rateProduct,
    mutate
  };
}

export default useRating;