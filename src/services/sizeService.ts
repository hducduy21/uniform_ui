import { api, authApi } from '@/configs/axios';
import { SizeRequest } from '@/types/dto';

const sizeService = {
  getSizes: async () => {
    const response = await api.get('/size').then((res) => res.data);
    return response;
  },

  getSizesById: async (id: number) => {
    const response = await api.get(`/size/${id}`).then((res) => res.data);
    return response;
  },

  createSize: async (request: SizeRequest) => {
    const response = await authApi.post('/size', request);
    return response.data;
  },
  updateSize: async (id: number, request: SizeRequest) => {
    const response = await authApi.put(`/size/${id}`, request);
    return response.data;
  },
};

export default sizeService;