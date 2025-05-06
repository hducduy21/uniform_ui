import useSWR from 'swr';
import categoryService from '@/services/categoryService';
import { CategoryType } from '@/types/model';

export function useTreeCategory() {
  const { data: categories, error, isLoading } = useSWR<CategoryType[]>(
    '/api/categories/trew',
    categoryService.getTreeCategories,
  );


  return {
    categories,
    isLoading,
    error,
  };
}

export default useTreeCategory;