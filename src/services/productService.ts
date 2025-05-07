import { api, authApi } from '@/configs/axios';
import { BulkProductStatusUpdateRequest, Page, ProductRequest } from '@/types/dto';
import { ProductType } from '@/types/model';
import { AxiosError } from 'axios';

const productService = {
  getProducts: async () => {
    try {
      const response = await api.get<Page<ProductType>>('/products');
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(
          error.response.data.data?.[0] || error.response.data.message || 'Get products failed'
        );
      }
      throw new Error('Get products failed, please try again');
    }
  },

  getProductsByURL: async (url: string) => {
    try {
      const response = await api.get<Page<ProductType>>(url);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(
          error.response.data.data?.[0] ||
            error.response.data.message ||
            'Get products by URL failed'
        );
      }
      throw new Error('Get products by URL failed, please try again');
    }
  },

  getProduct: async (id: string) => {
    try {
      const response = await api.get<ProductType>(`/products/${id}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(
          error.response.data.data?.[0] || error.response.data.message || 'Get product failed'
        );
      }
      throw new Error('Get product failed, please try again');
    }
  },

  getProductsByAdmin: async (url: string) => {
    try {
      const response = await authApi.get<Page<ProductType>>(url);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(
          error.response.data.data?.[0] ||
            error.response.data.message ||
            'Get admin products failed'
        );
      }
      throw new Error('Get admin products failed, please try again');
    }
  },

  getProductDetailById: async (url: string) => {
    try {
      const response = await authApi.get<ProductType>(url);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(
          error.response.data.data?.[0] ||
            error.response.data.message ||
            'Get product detail failed'
        );
      }
      throw new Error('Get product detail failed, please try again');
    }
  },

  createProduct: async (request: ProductRequest) => {
    try {
      const response = await authApi.post<string>('/admin/products', request);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(
          error.response.data.data?.[0] || error.response.data.message || 'Create product failed'
        );
      }
      throw new Error('Create product failed, please try again');
    }
  },

  uploadProductImage: async (id: string, file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await authApi.patch(`/admin/products/${id}/image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(
          error.response.data.data?.[0] ||
            error.response.data.message ||
            'Upload product image failed'
        );
      }
      throw new Error('Upload product image failed, please try again');
    }
  },

  updateBulkStatus: async (request: BulkProductStatusUpdateRequest) =>{
    try {
      const response = await authApi.patch<string>('/admin/products/status', request);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(
          error.response.data.data?.[0] || error.response.data.message || 'Update product status failed'
        );
      }
      throw new Error('Update product status failed, please try again');
    }

  }
};

export default productService;
