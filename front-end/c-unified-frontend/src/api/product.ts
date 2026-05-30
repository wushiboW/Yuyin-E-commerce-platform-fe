import { apiClient } from './request';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category?: string;
  tags?: string[];
  stock: number;
}

export interface ProductListParams {
  page?: number;
  pageSize?: number;
  category?: string;
  keyword?: string;
  sort?: 'price_asc' | 'price_desc' | 'latest';
}

export const productApi = {
  list: (params: ProductListParams) => 
    apiClient.get<{ items: Product[]; total: number }>('/products', { params }),
  
  detail: (id: string) => 
    apiClient.get<Product>(`/products/${id}`),
  
  categories: () => 
    apiClient.get<{ id: string; name: string; icon?: string }[]>('/products/categories'),
};

export default productApi;
