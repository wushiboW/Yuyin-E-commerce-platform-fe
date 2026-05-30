/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/**
 * 微信小程序全局变量类型声明
 * CLAUDE.md 9.3节 - 微信小程序专属设计开发规范
 */
interface WeChatGlobal {
  // 系统信息
  getSystemInfoSync?: () => WeChatSystemInfo;
  // 导航栏
  setNavigationBarColor?: (options: {
    frontColor: string;
    backgroundColor: string;
    animation?: { duration?: number; timingFunc?: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut' };
    complete?: () => void;
    fail?: (err: any) => void;
    success?: () => void;
  }) => void;
  setNavigationBarTitle?: (options: { title: string }) => void;
  // 分享
  showShareMenu?: (options?: { withShareTicket?: boolean; menus?: string[] }) => void;
  hideShareMenu?: (options?: { menus?: string[] }) => void;
  onShareAppMessage?: (callback: () => WeChatShareMessage) => void;
  onShareTimeline?: (callback: () => WeChatShareTimelineMessage) => void;
  // 存储
  getStorageSync?: (key: string) => string | undefined;
  setStorageSync?: (key: string, value: string) => void;
  // 小程序跳转
  miniProgram?: WeChatMiniProgram;
  // Toast
  showToast?: (options: { title: string; icon?: string; image?: string; duration?: number; mask?: boolean }) => void;
  // Modal
  showModal?: (options: WeChatModalOptions) => void;
}

interface WeChatSystemInfo {
  statusBarHeight?: number;
  safeArea?: WeChatSafeArea;
  screenWidth?: number;
  screenHeight?: number;
  windowWidth?: number;
  windowHeight?: number;
  platform?: string;
  brand?: string;
  model?: string;
  version?: string;
  system?: string;
}

interface WeChatSafeArea {
  top: number;
  right: number;
  bottom: number;
  left: number;
  width?: number;
  height?: number;
}

interface WeChatShareMessage {
  title?: string;
  path?: string;
  imageUrl?: string;
  query?: string;
  templateId?: string;
}

interface WeChatShareTimelineMessage {
  title?: string;
  query?: string;
  imageUrl?: string;
}

interface WeChatMiniProgram {
  navigateTo(options: { url: string; success?: () => void; fail?: () => void }): void;
  navigateBack(options?: { delta?: number }): void;
  switchTab(options: { url: string; success?: () => void; fail?: () => void }): void;
  reLaunch(options: { url: string; success?: () => void; fail?: () => void }): void;
  redirectTo(options: { url: string; success?: () => void; fail?: () => void }): void;
  getEnv(callback: (res: { miniprogram: boolean }) => void): void;
  navigateToMiniProgram(options: {
    appId: string;
    path?: string;
    extraData?: any;
    success?: () => void;
    fail?: () => void;
  }): void;
}

interface WeChatModalOptions {
  title?: string;
  content: string;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  success?: (res: { confirm: boolean; cancel: boolean }) => void;
  fail?: (err: any) => void;
}

declare const wx: WeChatGlobal;