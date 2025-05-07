import { authApi } from "@/configs/axios";
import { AxiosError } from "axios";

const ratingService = {
  getRating: async (url: string) => {
    try {
      const response = await authApi.get<number>(url);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(
          error.response.data.data?.[0] || error.response.data.message || 'Get rating failed'
        );
      }
      throw new Error('Get rating failed, please try again');
    }
  },

  rating: async({productId, rating}: {productId: string, rating: number}) => {
    try {
      const response = await authApi.post('/ratings', { productId, rating });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(
          error.response.data.data?.[0] || error.response.data.message || 'Rating failed'
        );
      }
      throw new Error('Rating failed, please try again');
    }
  }
}

export default ratingService;
