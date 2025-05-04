import productService from '@/services/productService';
import { Page, ProductRequest } from '@/types/dto';
import { ProductType } from '@/types/model';
import useSWR from 'swr';

export function useManageProduct() {
  const {
    data: products,
    error,
    isLoading,
    mutate,
  } = useSWR<Page<ProductType>>('/api/products', productService.getProductsByAdmin);

  const getProductDetail = async (id: string) => {
    try {
      const product = await productService.getProductDetailById(id);
      return product
    } catch (error) {
      throw error;
    }
  }


  const createProduct = async (request: ProductRequest) => {
    try {
      const id: string = await productService.createProduct(request);
      mutate();
      return id;
    } catch (error) {
      mutate(products, false);
      throw error;
    }
  };

  const uploadProductImage = async (id: string, file: File) => {
    try {
      await productService.uploadProductImage(id, file);
    } catch (error) {
      throw error;
    }
  };

  return {
    products,
    isLoading,
    error,
    createProduct,
    uploadProductImage,
    getProductDetail
  };
}
