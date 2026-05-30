import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDeviceDetect } from '../../hooks/useDeviceDetect';
import type { DeviceInfo } from '../../hooks/useDeviceDetect';

/**
 * 屿音品牌色配置 - CLAUDE.md 9.3.2 导航配置
 */
const BRAND_CONFIG = {
  navigationBar: {
    backgroundColor: '#FAFAF9',  // 墨白
    textStyle: 'black',           // 墨黑
    titleText: '屿音',            // 品牌名
  },
  tabBar: {
    color: '#6B6B6B',             // 暖灰
    selectedColor: '#1A1918',     // 墨黑 - 选中态
    backgroundColor: '#FAFAF9',   // 墨白
    borderStyle: 'black',        // 黑色边框
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页',
        iconPath: 'assets/tabbar/home.png',
        selectedIconPath: 'assets/tabbar/home-active.png',
      },
      {
        pagePath: 'pages/category/index',
        text: '分类',
        iconPath: 'assets/tabbar/category.png',
        selectedIconPath: 'assets/tabbar/category-active.png',
      },
      {
        pagePath: 'pages/cart/index',
        text: '购物车',
        iconPath: 'assets/tabbar/cart.png',
        selectedIconPath: 'assets/tabbar/cart-active.png',
      },
      {
        pagePath: 'pages/user/index',
        text: '我的',
        iconPath: 'assets/tabbar/user.png',
        selectedIconPath: 'assets/tabbar/user-active.png',
      },
    ],
  },
};

/**
 * 配置微信小程序原生导航栏
 * CLAUDE.md 9.3.2: 统一导航栏背景色、文字色匹配屿音品牌色
 */
function configureNavigationBar() {
  if (typeof wx !== 'undefined' && wx.setNavigationBarColor) {
    try {
      wx.setNavigationBarColor({
        frontColor: BRAND_CONFIG.navigationBar.textStyle,
        backgroundColor: BRAND_CONFIG.navigationBar.backgroundColor,
        animation: {
          duration: 300,
          timingFunc: 'easeInOut',
        },
      });
    } catch (e) {
      console.warn('Failed to set navigation bar color:', e);
    }
  }
}

/**
 * 状态栏高度自适应
 * CLAUDE.md 9.3.2: 适配微信不同机型状态栏高度
 */
function applySafeAreaPadding(statusBarHeight: number): React.CSSProperties {
  return {
    paddingTop: `${statusBarHeight}px`,
    boxSizing: 'border-box',
  };
}

/**
 * 获取页面分享配置
 * CLAUDE.md 9.3.3: 分享裂变规范
 */
function getShareConfig() {
  return {
    withShareTicket: true,
    titles: {
      home: '屿音 - 精选品质生活',
      product: '屿音 - 发现好物',
      cart: '屿音 - 我的购物车',
      order: '屿音 - 我的订单',
      user: '屿音 - 个人中心',
    },
    defaultImage: '/assets/share-cover.jpg',
  };
}

/**
 * 配置页面分享
 */
function configureShare(path: string) {
  if (typeof wx !== 'undefined' && wx.showShareMenu) {
    const shareConfig = getShareConfig();
    const title = shareConfig.titles[path as keyof typeof shareConfig.titles] || shareConfig.titles.home;

    try {
      wx.showShareMenu?.({
        withShareTicket: shareConfig.withShareTicket,
        menus: ['shareAppMessage', 'shareTimeline'],
      });

      // 自定义分享内容
      if (wx.onShareAppMessage) {
        wx.onShareAppMessage(() => ({
          title,
          path: `/${path}`,
          imageUrl: shareConfig.defaultImage,
        }));
      }

      if (wx.onShareTimeline) {
        wx.onShareTimeline(() => ({
          title,
          query: '',
          imageUrl: shareConfig.defaultImage,
        }));
      }
    } catch (e) {
      console.warn('Failed to configure share:', e);
    }
  }
}

interface MiniProgramLayoutProps {
  children: React.ReactNode;
}

/**
 * MiniProgramLayout - 微信小程序布局
 *
 * CLAUDE.md 9.3节核心要求:
 * 1. 状态栏自适应 - 适配微信不同机型状态栏高度
 * 2. 原生导航配置 - 统一导航栏背景色匹配屿音品牌色
 * 3. 底部Tab原生配置 - 使用小程序原生TabBar
 * 4. 分享裂变配置 - 商品页、活动页支持微信好友、朋友圈分享
 */
export function MiniProgramLayout({ children }: MiniProgramLayoutProps) {
  const location = useLocation();
  const { statusBarHeight } = useDeviceDetect();

  useEffect(() => {
    // 配置原生导航栏
    configureNavigationBar();

    // 获取当前页面路径
    const path = location.pathname.replace(/^\//, '').split('?')[0] || 'home';
    configureShare(path);
  }, [location.pathname]);

  return (
    <div
      className="min-h-screen bg-moon-white"
      style={applySafeAreaPadding(statusBarHeight)}
    >
      {/* 小程序使用原生导航栏，此处仅作为内容容器 */}
      <main className="min-h-[calc(100vh-var(--status-bar-height,0px))]">
        {children}
      </main>
    </div>
  );
}

export default MiniProgramLayout;

// 导出品牌配置供其他地方使用
export { BRAND_CONFIG, getShareConfig };