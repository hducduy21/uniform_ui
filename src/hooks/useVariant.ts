import variantsService from '@/services/variantsService';
import useSWR from 'swr';

const useVariant = (productId: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    productId ? `/products/${productId}/variants` : null,
    variantsService.getVariants
  );

  const updateVariant = async (
    productId: string,
    productVariantsCostPriceMap: Map<number, number>
  ) => {
    variantsService.updateVariants(productId, productVariantsCostPriceMap);
    mutate();
  };

  return {
    variant: data,
    isLoading,
    error,
    updateVariant
  };
};

export default useVariant;
