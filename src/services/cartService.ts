import { authApi } from "@/configs/axios";
import axios from "axios";

export const cartService = {
    getCarts: async () => {
        try {
            const response = await authApi.get('/carts');
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error message:', error.response?.data.message);
            }
            throw new Error('Get carts failed, please try again');
        }
    },

    addToCarts: async ({productVariantsId, quantity}: {productVariantsId: number, quantity: number}) => {
        try {
            await authApi.post('/carts', { productVariantsId, quantity});
          } catch (error) {
            if (axios.isAxiosError(error)) {
              console.error('Error message:', error.response?.data.message);
            }
            throw new Error('Something went wrong. Please try again later.');
          }
    },

    updateCart: async ({cartId, quantity}: {cartId: number, quantity: string}) => {
        try {
            await authApi.put(`/carts/${cartId}?quantity=${quantity}`);
          } catch (error) {
            if (axios.isAxiosError(error)) {
              console.error('Error message:', error.response?.data.message);
            }
            throw new Error('Something went wrong. Please try again later.');
          }
    },

    removeCart: async (cartId: number) => {
        try {
            await authApi.delete(`/carts/${cartId}`);
          } catch (error) {
            if (axios.isAxiosError(error)) {
              console.error('Error message:', error.response?.data.message);
            }
            throw new Error('Something went wrong. Please try again later.');
          }
    }
}