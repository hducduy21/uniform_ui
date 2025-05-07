import useSWR from 'swr';
import categoryService from '@/services/categoryService';
import { CategoryType } from '@/types/model';

export function useCategory() {
  const { data: categories, error, isLoading } = useSWR<CategoryType[]>(
    '/api/v1/categories',
    categoryService.getCategories,
    {
        revalidateOnFocus: false, 
        dedupingInterval: 60000,
    }
  );

  return {
    categories,
    isLoading,
    error,
  };
}

export default useCategory;