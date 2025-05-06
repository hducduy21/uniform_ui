import productService from '@/services/productService';
import { Page, ProductRequest } from '@/types/dto';
import { ProductType } from '@/types/model';
import { useState } from 'react';
import { toast } from 'react-toastify';
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
      return product;
    } catch (error) {
      throw error;
    }
  };

  const [isCreating, setIsCreating] = useState(false);
  const createProduct = async (request: ProductRequest) => {
    setIsCreating(true);
    try {
      const id: string = await productService.createProduct(request);
      toast.success('Create product successfully');
      mutate();
      return id;
    } catch (error: any) {
      toast.error(error.message);
      mutate(products, false);
      throw error;
    } finally {
      setIsCreating(false);
    }
  };

  const [isUploading, setIsUploading] = useState(false);
  const uploadProductImage = async (id: string, file: File) => {
    setIsUploading(true);
    try {
      await productService.uploadProductImage(id, file);
      toast.success('Upload product image successfully');
    } catch (error: any) {
      toast.error(error.message);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    products,
    isLoading,
    isCreating,
    isUploading,
    error,
    createProduct,
    uploadProductImage,
    getProductDetail,
  };
}
