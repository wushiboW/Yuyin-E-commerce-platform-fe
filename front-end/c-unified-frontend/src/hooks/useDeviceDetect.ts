import { useState, useEffect } from 'react';

export interface SafeAreaInfo {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface SystemInfo {
  statusBarHeight: number;
  safeArea: SafeAreaInfo;
  screenWidth: number;
  screenHeight: number;
  windowWidth: number;
  windowHeight: number;
  platform: string;
}

export interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isMiniProgram: boolean;
  isWeChat: boolean;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  statusBarHeight: number;
  safeArea: SafeAreaInfo;
}

/**
 * 获取微信小程序或H5环境系统信息
 */
function getSystemInfo(): SystemInfo | null {
  if (typeof wx !== 'undefined' && wx.getSystemInfoSync) {
    try {
      const info = wx.getSystemInfoSync();
      return {
        statusBarHeight: info.statusBarHeight || 0,
        safeArea: info.safeArea || { top: 0, right: 0, bottom: 0, left: 0 },
        screenWidth: info.screenWidth || 375,
        screenHeight: info.screenHeight || 812,
        windowWidth: info.windowWidth || 375,
        windowHeight: info.windowHeight || 812,
        platform: info.platform || 'h5',
      };
    } catch {
      return null;
    }
  }
  return null;
}

/**
 * 微信小程序/设备检测Hook
 * 支持状态栏高度自适应
 */
export function useDeviceDetect(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(() => {
    if (typeof window === 'undefined') {
      return {
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        isMiniProgram: false,
        isWeChat: false,
        deviceType: 'desktop',
        statusBarHeight: 0,
        safeArea: { top: 0, right: 0, bottom: 0, left: 0 },
      };
    }

    const systemInfo = getSystemInfo();
    const ua = navigator.userAgent.toLowerCase();

    // 微信环境检测
    const isWeChat = /micromessenger/i.test(ua);
    // 小程序环境检测
    const isMiniProgram = isWeChat && (
      typeof wx !== 'undefined' &&
      typeof (wx as any).miniProgram !== 'undefined'
    );

    // 优先使用微信API获取的状态栏高度
    if (systemInfo) {
      const width = systemInfo.windowWidth;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1200;
      const isDesktop = width >= 1200;

      return {
        isMobile: isMobile && !isTablet,
        isTablet,
        isDesktop,
        isMiniProgram,
        isWeChat,
        deviceType: isMobile && !isTablet ? 'mobile' : isTablet ? 'tablet' : 'desktop',
        statusBarHeight: systemInfo.statusBarHeight,
        safeArea: systemInfo.safeArea,
      };
    }

    // H5 fallback
    const width = window.innerWidth;
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1200;

    return {
      isMobile: isMobile && !isTablet,
      isTablet,
      isDesktop: !isMobile && !isTablet,
      isMiniProgram,
      isWeChat,
      deviceType: isMobile && !isTablet ? 'mobile' : isTablet ? 'tablet' : 'desktop',
      statusBarHeight: 0,
      safeArea: { top: 0, right: 0, bottom: 0, left: 0 },
    };
  });

  useEffect(() => {
    const handleResize = () => {
      const systemInfo = getSystemInfo();

      if (systemInfo) {
        const width = systemInfo.windowWidth;
        const isMobile = width < 768;
        const isTablet = width >= 768 && width < 1200;

        const ua = navigator.userAgent.toLowerCase();
        const isWeChat = /micromessenger/i.test(ua);
        const isMiniProgram = isWeChat && typeof wx !== 'undefined' && typeof (wx as any).miniProgram !== 'undefined';

        setDeviceInfo({
          isMobile: isMobile && !isTablet,
          isTablet,
          isDesktop: !isMobile && !isTablet,
          isMiniProgram,
          isWeChat,
          deviceType: isMobile && !isTablet ? 'mobile' : isTablet ? 'tablet' : 'desktop',
          statusBarHeight: systemInfo.statusBarHeight,
          safeArea: systemInfo.safeArea,
        });
      } else {
        const width = window.innerWidth;
        const isMobile = width < 768;
        const isTablet = width >= 768 && width < 1200;

        const ua = navigator.userAgent.toLowerCase();
        const isWeChat = /micromessenger/i.test(ua);
        const isMiniProgram = isWeChat && typeof wx !== 'undefined' && typeof (wx as any).miniProgram !== 'undefined';

        setDeviceInfo(prev => ({
          ...prev,
          isMobile: isMobile && !isTablet,
          isTablet,
          isDesktop: !isMobile && !isTablet,
          isMiniProgram,
          isWeChat,
          deviceType: isMobile && !isTablet ? 'mobile' : isTablet ? 'tablet' : 'desktop',
          statusBarHeight: prev.statusBarHeight,
          safeArea: prev.safeArea,
        }));
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return deviceInfo;
}

export default useDeviceDetect;