import { create } from 'zustand';

interface MarketingBanner {
  id: string;
  image: string;
  link?: string;
  alt?: string;
}

interface MarketingState {
  banners: MarketingBanner[];
  setBanners: (banners: MarketingBanner[]) => void;
}

export const useMarketingStore = create<MarketingState>((set) => ({
  banners: [],
  setBanners: (banners) => set({ banners }),
}));

export default useMarketingStore;
