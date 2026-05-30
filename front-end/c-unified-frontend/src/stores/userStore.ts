import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserInfo {
  id: string;
  nickname: string;
  avatar?: string;
  phone?: string;
}

interface UserState {
  userInfo: UserInfo | null;
  isLoggedIn: boolean;
  setUserInfo: (user: UserInfo | null) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userInfo: null,
      isLoggedIn: false,
      setUserInfo: (user) => set({ userInfo: user, isLoggedIn: !!user }),
      logout: () => set({ userInfo: null, isLoggedIn: false }),
    }),
    {
      name: 'yuyin-user-storage',
    }
  )
);

export default useUserStore;
