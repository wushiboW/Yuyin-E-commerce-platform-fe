import { useLocation, Link } from 'react-router-dom';

interface MobileLayoutProps {
  children: React.ReactNode;
}

/**
 * MobileLayout - 移动端H5布局
 * PlanE 高奢极简风格，底部Tab导航 + 顶部搜索栏
 */
export function MobileLayout({ children }: MobileLayoutProps) {
  const location = useLocation();

  const tabItems = [
    { path: '/', label: '首页', icon: 'home' },
    { path: '/product', label: '分类', icon: 'grid' },
    { path: '/cart', label: '购物车', icon: 'cart' },
    { path: '/user', label: '我的', icon: 'user' },
  ];

  const getIcon = (icon: string) => {
    switch (icon) {
      case 'home':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case 'grid':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        );
      case 'cart':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        );
            case 'user':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-moon-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-surface border-b border-light-gray safe-area-inset-top">
        <div className="px-4 py-3">
          {/* Logo & Search */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center flex-shrink-0">
              <span
                className="text-lg font-medium text-ink-black tracking-wide"
                style={{ fontFamily: "'Noto Serif SC', serif" }}
              >
                屿音
              </span>
            </Link>

            <Link
              to="/product"
              className="flex-1 flex items-center gap-2 px-3 py-2 bg-light-gray/50 text-warm-gray text-sm rounded-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>搜索商品</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content - with bottom padding for tab bar */}
      <main className="flex-1 px-4 py-4 pb-20 overflow-auto">
        {children}
      </main>

      {/* Bottom Tab Bar - 触控尺寸 ≥44px */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-light-gray safe-area-inset-bottom">
        <div className="flex items-center justify-around h-[72px] pt-1">
          {tabItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center gap-1 min-w-[64px] min-h-[56px] px-3 transition-colors ${
                isActive(item.path) ? 'text-gold-sand' : 'text-warm-gray'
              }`}
            >
              <div className="w-7 h-7">{getIcon(item.icon)}</div>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default MobileLayout;