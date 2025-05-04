import { api } from '@/configs/axios';
import { ProductVariantType } from '@/types/model';

const variantsService = {
  getVariants: async (url: string): Promise<ProductVariantType[]> => {
    const response = await api.get(url);
    console.log('response', response);
    return response.data;
  },
};
export default variantsService;
