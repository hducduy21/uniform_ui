import { api, authApi } from '@/configs/axios';
import { ProductVariantType } from '@/types/model';

const variantsService = {
  getVariants: async (url: string): Promise<ProductVariantType[]> => {
    const response = await api.get(url);
    return response.data;
  },
  updateVariants: async (
    productId: string,
    productVariantCostPriceMap: Map<number, number>
  ): Promise<void> => {
    await authApi.put(`/admin/products/${productId}/variants/price`, {productVariantCostPriceMap});
  },
};
export default variantsService;
