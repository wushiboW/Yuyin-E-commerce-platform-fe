interface MiniProgramLayoutProps {
  children: React.ReactNode;
}

/**
 * MiniProgramLayout - 微信小程序布局
 * 复用小程序原生导航栏，底部使用原生tabBar
 */
export function MiniProgramLayout({ children }: MiniProgramLayoutProps) {
  return (
    <div className="min-h-screen bg-moon-white">
      {/* 小程序使用原生导航栏，此处仅作为内容容器 */}
      <main>{children}</main>
    </div>
  );
}

export default MiniProgramLayout;
