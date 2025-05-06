import productService from '@/services/productService';
import { Page, PagingParams, QueryParams } from '@/types/dto';
import { ProductType } from '@/types/model';
import { ProductFilterType } from '@/types/utils';
import { convertProductFilterToUrlParams } from '@/utils/paramUtil';
import { useState } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';

export const useProducts = ({
  filters,
  pagination = { page: 1, size: 8 },
}: {
  filters: ProductFilterType;
  pagination?: PagingParams;
}) => {
  const [query, setQuery] = useState<string>(() => {
    return convertProductFilterToUrlParams(filters as ProductFilterType, pagination);
  });

  const {
    data: products,
    error,
    isLoading,
    mutate,
  } = useSWR<Page<ProductType>>(`/products${'?' + query}`, productService.getProductsByURL);

  const updateFilters = async ({ filters, pagination = { page: 1, size: 8 } }: QueryParams) => {
    try {
      const newQuery = convertProductFilterToUrlParams(filters as ProductFilterType, pagination);
      setQuery(newQuery);
      await mutate();
      toast.success('Filters updated successfully');
    } catch (error) {
      toast.error('Failed to update filters');
    }
  };

  return {
    products,
    isLoading,
    error,
    mutate,
    updateFilters,
  };
};
