import { Link } from 'react-router-dom';
import { useUserStore } from '@stores/userStore';

/**
 * Profile Page - 用户中心
 * PlanE 高奢极简风格，与整体网站风格统一
 */
export default function Profile() {
  const { userInfo, isLoggedIn } = useUserStore();

  const menuItems = [
    { label: '我的订单', path: '/order', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { label: '收货地址', path: '/user/address', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z' },
    { label: '优惠券', path: '/user/coupons', icon: 'M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z' },
    { label: '收藏夹', path: '/user/favorites', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
    { label: '账户设置', path: '/user/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
  ];

  return (
    <div className="min-h-screen bg-moon-white">
      {/* 用户信息区域 - 全屏沉浸式 */}
      <section className="relative w-full bg-ink-black py-16 sm:py-20 md:py-24 overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#C9A962] rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[#C9A962]/50 rounded-full blur-[80px]" />
        </div>

        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-8 sm:px-12 md:px-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            {/* 用户基本信息 */}
            <div className="flex items-center gap-6">
              {/* 头像 */}
              <div className="relative">
                {isLoggedIn ? (
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-[#C9A962]/50">
                    <img
                      src={userInfo?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80'}
                      alt={userInfo?.nickname || '用户'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-moon-white/10 border-2 border-moon-white/20 flex items-center justify-center">
                    <svg className="w-10 h-10 text-moon-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
                {/* 在线状态指示 */}
                {isLoggedIn && (
                  <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-ink-black" />
                )}
              </div>

              {/* 用户名和信息 */}
              <div>
                {isLoggedIn ? (
                  <>
                    <h2
                      className="text-2xl sm:text-3xl text-moon-white mb-2"
                      style={{ fontFamily: "'Noto Serif SC', serif" }}
                    >
                      {userInfo?.nickname || '尊贵用户'}
                    </h2>
                    <p className="text-moon-white/50 text-sm">
                      {userInfo?.phone ? `手机 ${userInfo.phone}` : '完善个人信息，享受更多权益'}
                    </p>
                  </>
                ) : (
                  <>
                    <h2
                      className="text-2xl sm:text-3xl text-moon-white/80 mb-2"
                      style={{ fontFamily: "'Noto Serif SC', serif" }}
                    >
                      您好，访客
                    </h2>
                    <Link
                      to="/login"
                      className="inline-flex items-center gap-2 text-[#C9A962] text-sm hover:text-gold-sand transition-colors duration-300"
                    >
                      <span>立即登录</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* 会员等级 */}
            {isLoggedIn && (
              <div className="flex items-center gap-6 lg:gap-8">
                <div className="text-center">
                  <p className="text-[#C9A962] text-2xl sm:text-3xl font-medium" style={{ fontFamily: "'Noto Serif SC', serif" }}>VIP</p>
                  <p className="text-moon-white/40 text-xs tracking-[0.2em] mt-1">会员等级</p>
                </div>
                <div className="w-px h-12 bg-moon-white/20" />
                <div className="text-center">
                  <p className="text-moon-white text-2xl sm:text-3xl font-medium">0</p>
                  <p className="text-moon-white/40 text-xs tracking-[0.2em] mt-1">优惠券</p>
                </div>
                <div className="w-px h-12 bg-moon-white/20" />
                <div className="text-center">
                  <p className="text-moon-white text-2xl sm:text-3xl font-medium">0</p>
                  <p className="text-moon-white/40 text-xs tracking-[0.2em] mt-1">收藏</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 主内容区域 */}
      <div className="w-full max-w-[1200px] mx-auto px-8 sm:px-12 md:px-16 py-12 sm:py-16">
        {/* 快速操作入口 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {[
            { label: '待支付', count: 0, color: 'text-[#E8B86D]' },
            { label: '待发货', count: 0, color: 'text-[#8B9DC3]' },
            { label: '待收货', count: 1, color: 'text-[#9DB39B]' },
            { label: '待评价', count: 0, color: 'text-[#B89B8B]' },
          ].map((item, index) => (
            <Link
              key={item.label}
              to="/order"
              className="group relative bg-ivory/50 hover:bg-ivory border border-light-gray/30 p-6 sm:p-8 transition-all duration-300 hover:border-[#C9A962]/30"
            >
              <p className={`text-3xl sm:text-4xl font-light mb-2 ${item.color}`} style={{ fontFamily: "'Noto Serif SC', serif" }}>
                {item.count}
              </p>
              <p className="text-ink-black/60 text-sm tracking-[0.1em]">{item.label}</p>
              {/* 悬停指示 */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-4 h-4 text-[#C9A962]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* 功能菜单 */}
        <section>
          <h3 className="text-lg text-ink-black/40 tracking-[0.2em] mb-6" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
            我的服务
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {menuItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                className="group flex items-center justify-between p-5 sm:p-6 bg-moon-white border border-light-gray/20 hover:border-[#C9A962]/40 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-ink-black/5 group-hover:bg-[#C9A962]/10 rounded-full transition-colors duration-300">
                    <svg className="w-5 h-5 text-ink-black/60 group-hover:text-[#C9A962] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={item.icon} />
                    </svg>
                  </div>
                  <span className="text-ink-black group-hover:text-[#C9A962] transition-colors duration-300 tracking-[0.05em]">
                    {item.label}
                  </span>
                </div>
                <svg className="w-4 h-4 text-warm-gray group-hover:text-[#C9A962] group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </section>

        {/* 底部安全退出 */}
        {isLoggedIn && (
          <div className="mt-12 pt-8 border-t border-light-gray/30">
            <button
              className="w-full sm:w-auto px-8 py-3 text-warm-gray hover:text-ink-black border border-light-gray/30 hover:border-ink-black/20 transition-all duration-300 text-sm tracking-[0.1em]"
            >
              安全退出
            </button>
          </div>
        )}
      </div>
    </div>
  );
}