import { Link, useLocation } from 'react-router-dom';
import { Avatar } from '@components/Avatar';
import { useUserStore } from '@stores/userStore';
import { useState, useEffect, useCallback } from 'react';

interface DesktopLayoutProps {
  children: React.ReactNode;
}

/**
 * DesktopLayout - 桌面端布局
 * PlanE 高奢极简风格，固定顶部导航 + 中心内容区
 */
export function DesktopLayout({ children }: DesktopLayoutProps) {
  const location = useLocation();
  const { isLoggedIn } = useUserStore();
  const [isAtTop, setIsAtTop] = useState(true);
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>(() => {
    // 初始化：检查localStorage或系统偏好
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('yuyin-theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  const isHomePage = location.pathname === '/';
  const isDark = themeMode === 'dark';
  const isTransparentMode = isHomePage && isAtTop;

  // 滚动检测 - 阈值改为1px，快速响应
  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 1);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 同步主题到html和localStorage
  useEffect(() => {
    const html = document.documentElement;
    if (themeMode === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    localStorage.setItem('yuyin-theme', themeMode);
  }, [themeMode]);

  // 切换主题（用户手动切换，不跟随系统）
  const toggleTheme = useCallback(() => {
    setThemeMode(currentTheme => currentTheme === 'dark' ? 'light' : 'dark');
  }, []);

  const navItems = [
    { path: '/', label: '推荐' },
    { path: '/product', label: '空山物语' },
    { path: '/cart', label: '怦然心动' },
    { path: '/about', label: '晓屿识音' },
  ];

  const isActive = (path: string) => location.pathname === path;

  // 导航栏文字颜色 - 透明模式用白色，非透明模式根据主题适配
  const navTextColor = isTransparentMode ? 'text-white/60' : 'text-ink-black dark:text-white/60';
  const navTextHoverColor = 'hover:text-[#C9A962]';
  const navActiveColor = 'text-[#C9A962]';

  return (
    <div className="min-h-screen bg-moon-white dark:bg-ink-black">
      {/* Header - 全宽导航栏 */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full h-16 transition-all duration-500 ${
          isTransparentMode
            ? 'bg-transparent backdrop-blur-none'
            : 'bg-moon-white/95 dark:bg-ink-black/95 backdrop-blur-xl'
        }`}
      >
        {/* 全宽flex布局 */}
        <div className="relative w-full h-full flex items-center">
          {/* Logo区域 - 左对齐 */}
          <div className="flex items-center gap-4 pl-8 sm:pl-12 md:pl-16 lg:pl-24">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
              {/* 品牌图标 - 金色山峦线条 */}
              <svg
                className="w-8 h-8 sm:w-9 sm:h-9 text-[#C9A962] transition-all duration-300 group-hover:scale-110"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path d="M6 26L16 8L26 26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 26L16 16L22 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
              </svg>
              <span
                className="text-xl sm:text-2xl font-medium text-[#C9A962] tracking-[0.08em]"
                style={{ fontFamily: "'Noto Serif SC', serif" }}
              >
                屿音
              </span>
            </Link>

            {/* Navigation - 全部显示，当前页金色，其他白色，悬停金色 */}
            <nav className="hidden lg:flex items-center gap-1 ml-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium tracking-[0.06em] px-4 py-2 transition-all duration-300 ${
                    isActive(item.path)
                      ? navActiveColor
                      : `${navTextColor} ${navTextHoverColor}`
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right section - 绝对定位到最右侧，贴近浏览器边缘 */}
          <div
            className="absolute right-0 flex items-center gap-1 pr-4 sm:pr-6 md:pr-8 lg:pr-12"
          >
            {/* 搜索图标 */}
            <button
              className={`p-3 transition-all duration-300 rounded-full ${navTextColor} ${navTextHoverColor}`}
              title="搜索"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* 分隔线 */}
            <div className={`w-px h-5 mx-1 ${isTransparentMode ? 'bg-white/20' : 'bg-ink-black/20 dark:bg-white/20'}`} />

            {/* 登录项或用户头像 */}
            {isLoggedIn ? (
              <Link
                to="/user"
                className="flex items-center p-1 transition-all duration-300 rounded-full hover:bg-white/10"
              >
                <Avatar size="sm" />
              </Link>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-5 py-2.5 text-sm text-[#C9A962] border border-[#C9A962]/30 hover:border-[#C9A962] hover:bg-[#C9A962]/10 transition-all duration-300 rounded-full"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>登录</span>
              </Link>
            )}

            {/* 语言切换 */}
            <button
              className={`p-3 transition-all duration-300 rounded-full ${navTextColor} ${navTextHoverColor}`}
              title="语言切换"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
            </button>

            {/* 主题切换 */}
            <button
              onClick={toggleTheme}
              className={`p-3 transition-all duration-300 rounded-full ${navTextColor} ${navTextHoverColor}`}
              title={isDark ? '切换浅色模式' : '切换深色模式'}
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content - 固定padding，轮播图用负margin穿透 */}
      <main className="w-full pt-14 sm:pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-light-gray/30 dark:border-white/10 mt-auto">
        <div className="w-full max-w-[1600px] mx-auto px-8 sm:px-12 md:px-16 lg:px-20 py-10 sm:py-14">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-warm-gray dark:text-white/50">
            <p className="tracking-[0.05em]">© 2024 屿音电商. 保留所有权利.</p>
            <div className="flex items-center gap-8">
              <a href="#" className="hover:text-ink-black dark:hover:text-[#C9A962] transition-colors duration-300 tracking-[0.05em]">关于我们</a>
              <a href="#" className="hover:text-ink-black dark:hover:text-[#C9A962] transition-colors duration-300 tracking-[0.05em]">联系客服</a>
              <a href="#" className="hover:text-ink-black dark:hover:text-[#C9A962] transition-colors duration-300 tracking-[0.05em]">隐私政策</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default DesktopLayout;