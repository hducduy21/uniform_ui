import useSWR from 'swr';
import categoryService from '@/services/categoryService';
import { CategoryDetailType } from '@/types/model';
import { CategoryRequest } from '@/types/dto';
import { toast } from 'react-toastify';
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
      toast.success('Category created successfully');
      return newCategory;
    } catch (error) {
      mutate(categories, false);
      toast.error('Failed to create category');
      throw error;
    }
  };

  const updatedCategory = async (id: number, request: CategoryRequest) => {
    try {
      const updatedCategory = await categoryService.updateCategory(id, request);
      mutate();
      toast.success('Category updated successfully');
      return updatedCategory;
    } catch (error) {
      mutate(categories, false);
      toast.error('Failed to update category');
      throw error;
    }
  };

  return {
    categories,
    isLoading,
    error,
    createCategory,
    updatedCategory,
  };
}
