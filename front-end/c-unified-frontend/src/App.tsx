import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { DesktopLayout } from './layouts/DesktopLayout';
import { MobileLayout } from './layouts/MobileLayout';
import { MiniProgramLayout } from './layouts/MiniProgramLayout/MiniProgramLayout';
import { Spinner } from './components';
import { useDeviceDetect } from './hooks/useDeviceDetect';

const Home = lazy(() => import('./features/product/pages/Home'));
const ProductList = lazy(() => import('./features/product/pages/ProductList'));
const ProductDetail = lazy(() => import('./features/product/pages/ProductDetail'));
const Cart = lazy(() => import('./features/cart/pages/Cart'));
const Checkout = lazy(() => import('./features/cart/pages/Checkout'));
const OrderList = lazy(() => import('./features/order/pages/OrderList'));
const OrderDetail = lazy(() => import('./features/order/pages/OrderDetail'));
const UserProfile = lazy(() => import('./features/user/pages/Profile'));
const Login = lazy(() => import('./features/user/pages/Login'));

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner size="lg" />
    </div>
  );
}

function AppContent() {
  const { isMobile, isMiniProgram } = useDeviceDetect();

  if (isMiniProgram) {
    return (
      <MiniProgramLayout>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order" element={<OrderList />} />
            <Route path="/order/:id" element={<OrderDetail />} />
            <Route path="/user" element={<UserProfile />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Suspense>
      </MiniProgramLayout>
    );
  }

  if (isMobile) {
    return (
      <MobileLayout>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order" element={<OrderList />} />
            <Route path="/order/:id" element={<OrderDetail />} />
            <Route path="/user" element={<UserProfile />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Suspense>
      </MobileLayout>
    );
  }

  return (
    <DesktopLayout>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order" element={<OrderList />} />
          <Route path="/order/:id" element={<OrderDetail />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </DesktopLayout>
  );
}

export default function App() {
  return <AppContent />;
}
