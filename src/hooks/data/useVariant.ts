import variantsService from '@/services/variantsService';
import { useState } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';

const useVariant = (productId: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    productId ? `/products/${productId}/variants` : null,
    variantsService.getVariants
  );

  const [isUpdating, setIsUpdating] = useState(false);
  const updateVariant = async (
    productId: string,
    productVariantsCostPriceMap: Map<number, number>
  ) => {
    setIsUpdating(true);
    try {
      await variantsService.updateVariants(productId, productVariantsCostPriceMap);
      mutate();
      toast.success('Update variants successfully');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    variant: data,
    isLoading,
    isUpdating,
    error,
    updateVariant,
  };
};

export default useVariant;
