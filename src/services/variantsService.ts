import { api, authApi } from '@/configs/axios';
import { ProductVariantType } from '@/types/model';
import { AxiosError } from 'axios';

const variantsService = {
  getVariants: async (url: string): Promise<ProductVariantType[]> => {
    try {
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(
          error.response.data.data?.[0] || error.response.data.message || 'Get variants failed'
        );
      }
      throw new Error('Get variants failed, please try again');
    }
  },

  updateVariants: async (
    productId: string,
    productVariantCostPriceMap: Map<number, number>
  ): Promise<void> => {
    try {
      await authApi.put(`/admin/products/${productId}/variants/price`, { productVariantCostPriceMap });
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(
          error.response.data.data?.[0] || error.response.data.message || 'Update variants failed'
        );
      }
      throw new Error('Update variants failed, please try again');
    }
  },
};

export default variantsService;
