import { apiClient } from './request';
import { CartItem } from '@stores/cartStore';

export const cartApi = {
  sync: (items: CartItem[]) =>
    apiClient.post<{ success: boolean }>('/cart/sync', { items }),
  
  get: () =>
    apiClient.get<CartItem[]>('/cart'),
};

export default cartApi;
