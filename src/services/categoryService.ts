import { api, authApi } from '@/configs/axios';
import { CategoryRequest } from '@/types/dto';

const categoryService = {
  getCategories: async () => {
    const response = await api.get('/categories').then((res) => res.data);
    return response;
  },

  getDetailCategories: async () => {
    const response = await authApi.get('/categories/detail').then((res) => res.data);
    return response;
  },
  createCategory: async (request: CategoryRequest) => {
    const response = await authApi.post('/categories', request);
    return response.data;
  },
  updateCategory: async (id: number, request: CategoryRequest) => {
    const response = await authApi.put(`/categories/${id}`, request);
    console.log('updateCategory response', request);
    return response.data;
  },
};

export default categoryService;
