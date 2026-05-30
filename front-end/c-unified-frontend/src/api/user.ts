import { apiClient } from './request';

export interface User {
  id: string;
  nickname: string;
  avatar?: string;
  phone?: string;
}

export const userApi = {
  login: (phone: string, code: string) =>
    apiClient.post<{ token: string; user: User }>('/auth/login', { phone, code }),
  
  getProfile: () =>
    apiClient.get<User>('/user/profile'),
  
  updateProfile: (data: Partial<User>) =>
    apiClient.put<User>('/user/profile', data),
  
  sendCode: (phone: string) =>
    apiClient.post<void>('/auth/send-code', { phone }),
};

export default userApi;
