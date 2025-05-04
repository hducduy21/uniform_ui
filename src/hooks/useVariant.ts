import variantsService from '@/services/variantsService';
import useSWR from 'swr';

const useVariant = (productId: string) => {
    const { data, error, isLoading } = useSWR(
      productId ? `/admin/products/${productId}/variants` : null,
      variantsService.getVariants
    );
  
    return {
      variant: data,
      isLoading,
      error,
    };
  };

export default useVariant;
