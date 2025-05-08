import productService from '@/services/productService';
import { BulkProductStatusUpdateRequest, Page, PagingParams, ProductRequest, QueryParams } from '@/types/dto';
import { ProductType } from '@/types/model';
import { FilterType } from '@/types/utils';
import { convertFilterToUrlParams } from '@/utils/paramUtil';
import { useState } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';

export const useManageProduct = ({
  filters,
  pagination = { page: 1, size: 10 },
}: {
  filters?: FilterType;
  pagination?: PagingParams;
})  => {
  const [query, setQuery] = useState<string>(() => {
    return convertFilterToUrlParams(filters as FilterType, pagination);
  });

  const {
    data: products,
    error,
    isLoading,
    mutate,
  } = useSWR<Page<ProductType>>(`/admin/products${'?' + query}`, productService.getProductsByAdmin);

  const getProductDetail = async (id: string) => {
    try {
      const product = await productService.getProductDetailById(id);
      return product;
    } catch (error) {
      throw error;
    }
  };

  const updateFilters = async ({ filters, pagination = { page: 1, size: 8 } }: QueryParams) => {
      try {
        const newQuery = convertFilterToUrlParams(filters as FilterType, pagination);
        setQuery(newQuery);
        await mutate();
      } catch (error) {
        toast.error('Failed to update filters');
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

  const [isUpdating, setIsUpdating] = useState(false);
  const updateProduct = async (idproduct: string,request: ProductRequest) => {
    setIsCreating(true);
    try {
      const id: string = await productService.updateProduct(idproduct,request);
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

  const updateBulkProduct = async (bulk: BulkProductStatusUpdateRequest) => {
    setIsUpdating(true);
    try {
      await productService.updateBulkStatus(bulk);
      toast.success('Update product successfully');
      mutate();
    } catch (error: any) {
      toast.error(error.message);
      mutate(products, false);
      throw error;
    } finally {
      setIsUpdating(false);
    }
  }

  return {
    products,
    isLoading,
    isCreating,
    isUploading,
    isUpdating,
    error,
    createProduct,
    updateProduct,
    uploadProductImage,
    getProductDetail,
    updateFilters,
    updateBulkProduct,
  };
}
