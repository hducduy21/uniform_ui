import useSWR from 'swr';
import categoryService from '@/services/categoryService';
import { CategoryDetailType } from '@/types/model';
import { CategoryRequest } from '@/types/dto';

export function useManageCategory() {
  const {
    data: categories,
    error,
    isLoading,
    mutate,
  } = useSWR<CategoryDetailType[]>('/api/categories/detail', categoryService.getDetailCategories);

  const createCategory = async (request: CategoryRequest) => {
    try {
      const newCategory = await categoryService.createCategory(request);
      mutate();
      return newCategory;
    } catch (error) {
      mutate(categories, false);
      throw error;
    }
  };

  const updatedCategory = async (id: number, request: CategoryRequest) => {
    try {
      const newCategory = await categoryService.updateCategory(id,request);
      mutate();
      return updatedCategory;
    } catch (error) {
      mutate(categories, false);
      throw error;
    }
  };

  return {
    categories,
    isLoading,
    error,
    createCategory,
    updatedCategory
  };
}
