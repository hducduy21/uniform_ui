import { api, authApi } from '@/configs/axios';
import { SizeRequest } from '@/types/dto';
import { AxiosError } from 'axios';

const sizeService = {
  getSizes: async () => {
    try {
      const response = await api.get('/sizes');
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(
          error.response.data.data?.[0] || error.response.data.message || 'Get sizes failed'
        );
      }
      throw new Error('Get sizes failed, please try again');
    }
  },

  getSizesById: async (id: number) => {
    try {
      const response = await api.get(`/sizes/${id}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(
          error.response.data.data?.[0] || error.response.data.message || 'Get size by ID failed'
        );
      }
      throw new Error('Get size by ID failed, please try again');
    }
  },

  createSize: async (request: SizeRequest) => {
    try {
      const response = await authApi.post('/sizes', request);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(
          error.response.data.data?.[0] || error.response.data.message || 'Create size failed'
        );
      }
      throw new Error('Create size failed, please try again');
    }
  },

  updateSize: async (id: number, request: SizeRequest) => {
    try {
      const response = await authApi.put(`/sizes/${id}`, request);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(
          error.response.data.data?.[0] || error.response.data.message || 'Update size failed'
        );
      }
      throw new Error('Update size failed, please try again');
    }
  },
};

export default sizeService;
