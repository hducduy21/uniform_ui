import { cartService } from "@/services/cartService";
import { Page } from "@/types/dto";
import { CartType } from "@/types/model";
import axios from "axios";
import { toast } from "react-toastify";
import useSWR from "swr";

export function useCarts() {
    const { data: carts, error, isLoading, mutate } = useSWR<Page<CartType>>(
      '/api/v1/carts?page=0&size=100',
      cartService.getCarts,
    );

    const addToCarts = async ({ productVariantsId, quantity }: { productVariantsId: number; quantity: number }) => {
        try {
            await cartService.addToCarts({ productVariantsId, quantity });
            toast.success('Product added to cart successfully');
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error('Error message:', error.response?.data.message);
                console.error('Error message:', error.response?.data.message);
            }
            else {
                toast.error('An unexpected error occurred');
            }
        }
    };

    const updateCart = async ({ cartId, quantity }: { cartId: number; quantity: string }) => {
        try {
            await cartService.updateCart({ cartId, quantity });
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error message:', error.response?.data.message);
            }
            else {
                toast.error('An unexpected error occurred');
            }
        }
    };
    const removeCart = async (cartId: number) => {
        try {
            await cartService.removeCart(cartId);
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error message:', error.response?.data.message);
            }
            else {
                toast.error('An unexpected error occurred');
            }
        }
    };


  
    return {
      carts,
      isLoading,
      error,
      mutate,
      addToCarts,
      updateCart,
      removeCart
    };
  }
  
  export default useCarts;