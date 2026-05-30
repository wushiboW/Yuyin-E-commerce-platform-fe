# 屿音电商 C 端统一前台 (Yuyin C-Unified-Frontend)

![屿音电商首页](./public/banner.png)

屿音电商面向 C 端用户的统一前端应用，整合用户中心、电商主应用、购物系统、支付金融中心、订单中心、营销活动中心六大模块，提供无缝的全流程用户体验。

## 技术栈

| 分类 | 技术 |
|------|------|
| 框架 | React 18 + TypeScript |
| 构建 | Vite 5 |
| 样式 | Tailwind CSS |
| 路由 | React Router DOM 6 |
| 状态管理 | Zustand |
| 数据请求 | TanStack React Query + Axios |
| 三端适配 | 桌面端 / 移动端 H5 / 微信小程序 |

## 项目结构

```
src/
├── api/              # 统一 API 层
├── components/        # 原子组件库 (17个)
├── features/          # 功能模块
│   ├── cart/          # 购物车
│   ├── marketing/     # 营销活动
│   ├── order/         # 订单中心
│   ├── payment/       # 支付金融
│   ├── product/       # 商品模块
│   └── user/          # 用户中心
├── hooks/             # 自定义 Hooks
├── layouts/           # 三端布局组件
│   ├── DesktopLayout/ # 桌面端布局
│   ├── MobileLayout/  # 移动端布局
│   └── MiniProgramLayout/ # 小程序布局
├── stores/            # Zustand 全局状态
└── styles/            # 全局样式
```

## 开发环境配置

### 环境变量

项目根目录提供两种环境配置：

| 文件 | 用途 |
|------|------|
| `.env.development` | 开发环境 (localhost:8080) |
| `.env.production` | 生产环境 (api.yuyin.com) |

### 脚本命令

```bash
# 开发模式
npm run dev           # 开发环境 (默认)
npm run dev:prod      # 生产环境配置启动

# 构建
npm run build         # 默认构建
npm run build:dev     # 开发环境构建
npm run build:prod    # 生产环境构建

# 其他
npm run type-check    # TypeScript 类型检查
npm run preview       # 预览构建产物
```

## 三端适配

本项目遵循屿音电商「C 端统一前台 + B 端独立中台」架构，同时适配三种客户端：

- **桌面端 (Desktop)** — 1440px+ 宽屏，完整导航
- **移动端 H5 (Mobile)** — 360px，断点自适应
- **微信小程序 (MiniProgram)** — 原生小程序适配

自动检测设备类型并切换对应布局，共享同一套路由和状态管理。

## 设计规范

参考 [屿音电商前端设计开发规范](./CLAUDE.md)，遵循：

- 品牌调性优先：极简克制、留白为王
- 移动优先响应式适配
- 原子化组件开发
- 高性能优化（代码分割、懒加载、图片优化）

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 相关文档

- [设计规范](./CLAUDE.md)
- [ SERVICES.md](../../project_materials/SERVICES.md) — 服务地址与端口配置
- [架构文档](../../architecture_diagram/) — 系统架构图

---

> 屿音电商 — 高奢极简·东方哲学