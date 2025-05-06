import { api, authApi } from "@/configs/axios";
import { Page, ProductRequest } from "@/types/dto";
import { ProductType } from "@/types/model";

const productService = {
    getProducts: async () => {
        const response = await api.get<Page<ProductType>>("/products");
        return response.data;
    },
    getProductsByURL: async (url: string) => {
        console.log(url);
        const response = await api.get<Page<ProductType>>(url);
        return response.data;
    },

    getProduct: async (id: string) => {
        const response = await api.get<ProductType>(`/products/${id}`);
        return response.data;
    },

    getProductsByAdmin: async () => {
        const response = await authApi.get<Page<ProductType>>("/admin/products");
        return response.data;
    },

    getProductDetailById: async (url: string) => {
        const response = await authApi.get<ProductType>(url);
        return response.data;
    },

    createProduct: async (request: ProductRequest) => {
        console.log(request);
        const response = await authApi.post<string>("/admin/products", request);
        return response.data;
    },

    uploadProductImage: async (id: string, file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        const response = await authApi.patch(`/admin/products/${id}/image`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    },
}

export default productService;