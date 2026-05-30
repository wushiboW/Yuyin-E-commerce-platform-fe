import { apiClient } from './request';

export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'completed' | 'cancelled';

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Order {
  id: string;
  orderNo: string;
  status: OrderStatus;
  totalAmount: number;
  items: OrderItem[];
  createdAt: string;
  shippingAddress?: {
    name: string;
    phone: string;
    address: string;
  };
}

export interface OrderListParams {
  page?: number;
  pageSize?: number;
  status?: OrderStatus;
}

export const orderApi = {
  list: (params: OrderListParams) =>
    apiClient.get<{ items: Order[]; total: number }>('/orders', { params }),
  
  detail: (id: string) =>
    apiClient.get<Order>(`/orders/${id}`),
  
  cancel: (id: string) =>
    apiClient.post<void>(`/orders/${id}/cancel`),
};

export default orderApi;
