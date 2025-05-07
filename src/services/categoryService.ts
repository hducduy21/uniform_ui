import { api, authApi } from '@/configs/axios';
import { CategoryRequest } from '@/types/dto';
import { AxiosError } from 'axios';

const categoryService = {
  getCategories: async () => {
    try {
      const response = await api.get('/categories');
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(
          error.response.data.data?.[0] || error.response.data.message || 'Get categories failed'
        );
      }
      throw new Error('Get categories failed, please try again');
    }
  },

  getTreeCategories: async () => {
    try {
      const response = await api.get('/categories/tree');
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(
          error.response.data.data?.[0] || error.response.data.message || 'Get tree categories failed'
        );
      }
      throw new Error('Get tree categories failed, please try again');
    }
  },

  getDetailCategories: async () => {
    try {
      const response = await authApi.get('/categories/detail');
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(
          error.response.data.data?.[0] || error.response.data.message || 'Get detail categories failed'
        );
      }
      throw new Error('Get detail categories failed, please try again');
    }
  },

  createCategory: async (request: CategoryRequest) => {
    try {
      const response = await authApi.post('/categories', request);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(
          error.response.data.data?.[0] || error.response.data.message || 'Create category failed'
        );
      }
      throw new Error('Create category failed, please try again');
    }
  },

  updateCategory: async (id: number, request: CategoryRequest) => {
    try {
      const response = await authApi.put(`/categories/${id}`, request);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(
          error.response.data.data?.[0] || error.response.data.message || 'Update category failed'
        );
      }
      throw new Error('Update category failed, please try again');
    }
  },
};

export default categoryService;
