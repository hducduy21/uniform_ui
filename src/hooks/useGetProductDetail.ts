import productService from '@/services/productService';
import { ProductType } from '@/types/model';
import useSWR from 'swr';

const useGetProductDetail = (productId: string) => {
  const { data, error, isLoading } = useSWR<ProductType>(
    productId ? `/admin/products/${productId}` : null,
    productService.getProductDetailById
  );

  return {
    product: data,
    isLoading,
    error,
  };
};
export default useGetProductDetail;
