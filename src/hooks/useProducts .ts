import productService from '@/services/productService';
import { Page, PagingParams, QueryParams } from '@/types/dto';
import { ProductType } from '@/types/model';
import { ProductFilterType } from '@/types/utils';
import { convertProductFilterToUrlParams } from '@/utils/paramUtil';
import { useState } from 'react';
import useSWR from 'swr';

export const useProducts = ({
  filters,
  pagination = { page: 0, size: 10 },
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

  const updateFilters = ({ filters, pagination = { page: 1, size: 10 } }: QueryParams) => {
      setQuery(convertProductFilterToUrlParams(filters as ProductFilterType, pagination));
      mutate();
    };

  return {
    products,
    isLoading,
    error,
    mutate,
    updateFilters
  };
}
