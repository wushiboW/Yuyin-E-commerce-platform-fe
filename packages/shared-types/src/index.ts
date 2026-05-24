# Shared TypeScript types for Yuyin E-commerce Platform
# All frontend and BFF services share these types

export interface BaseResponse<T = any> {
  code: number;
  message: string;
  data: T;
  timestamp: number;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  level: number;
  createdAt: string;
  updatedAt: string;
}

export enum UserRole {
  Customer = 'customer',
  Merchant = 'merchant',
  Admin = 'admin',
  SuperAdmin = 'super_admin'
}

export interface Product {
  id: string;
  spuId: string;
  skuId: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  stock: number;
  images: string[];
  categoryId: string;
  brandId?: string;
  tags: string[];
  status: ProductStatus;
  createdAt: string;
  updatedAt: string;
}

export enum ProductStatus {
  Active = 'active',
  Inactive = 'inactive',
  OutOfStock = 'out_of_stock',
  Deleted = 'deleted'
}

export interface Order {
  id: string;
  orderNo: string;
  userId: string;
  status: OrderStatus;
  totalAmount: number;
  freightAmount: number;
  discountAmount: number;
  finalAmount: number;
  address: Address;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export enum OrderStatus {
  Pending = 'pending',
  Paid = 'paid',
  Shipped = 'shipped',
  Delivered = 'delivered',
  Completed = 'completed',
  Cancelled = 'cancelled',
  Refunded = 'refunded'
}

export interface OrderItem {
  productId: string;
  skuId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Address {
  id: string;
  userId: string;
  name: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  detail: string;
  isDefault: boolean;
}

export interface CartItem {
  id: string;
  userId: string;
  skuId: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  selected: boolean;
}

export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  channel: PaymentChannel;
  status: PaymentStatus;
  transactionId?: string;
  paidAt?: string;
  createdAt: string;
}

export enum PaymentChannel {
  Alipay = 'alipay',
  WechatPay = 'wechat_pay',
  UnionPay = 'union_pay',
  CreditCard = 'credit_card'
}

export enum PaymentStatus {
  Pending = 'pending',
  Success = 'success',
  Failed = 'failed',
  Refunded = 'refunded'
}

export interface Coupon {
  id: string;
  code: string;
  type: CouponType;
  value: number;
  minAmount: number;
  validFrom: string;
  validTo: string;
  status: CouponStatus;
  usedCount: number;
  totalCount: number;
}

export enum CouponType {
  Fixed = 'fixed',
  Percentage = 'percentage',
  Discount = 'discount'
}

export enum CouponStatus {
  Active = 'active',
  Expired = 'expired',
  Depleted = 'depleted'
}

export interface LogisticsInfo {
  orderId: string;
  expressCompany: string;
  trackingNo: string;
  status: LogisticsStatus;
  traces: LogisticsTrace[];
}

export interface LogisticsTrace {
  time: string;
  location: string;
  description: string;
}

export enum LogisticsStatus {
  Pending = 'pending',
  Shipped = 'shipped',
  InTransit = 'in_transit',
  Delivered = 'delivered',
  Exception = 'exception'
}