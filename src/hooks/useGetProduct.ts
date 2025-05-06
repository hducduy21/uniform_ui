import productService from '@/services/productService';
import { ProductType } from '@/types/model';
import useSWR from 'swr';

export function useGetProduct(id: string) {
    const {
      data: product,
      error,
      isLoading,
      mutate,
    } = useSWR<ProductType>(id, productService.getProduct);
    return {
      product,
      isLoading,
      error,
      mutate
    };
  }
  