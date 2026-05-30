import { Link } from 'react-router-dom';
import { Card } from '@components/Card';
import { Badge } from '@components/Badge';
import { Button } from '@components/Button';
import { EmptyState } from '@components/EmptyState';

/**
 * OrderList Page - 订单列表页
 */
const mockOrders = [
  { id: '1', orderNo: 'YY20240529001', status: 'pending', totalAmount: 2560, createdAt: '2024-05-29' },
  { id: '2', orderNo: 'YY20240528002', status: 'shipped', totalAmount: 1280, createdAt: '2024-05-28' },
];

const statusMap = {
  pending: { label: '待支付', variant: 'warning' as const },
  paid: { label: '已支付', variant: 'success' as const },
  shipped: { label: '已发货', variant: 'accent' as const },
  delivered: { label: '已收货', variant: 'success' as const },
  completed: { label: '已完成', variant: 'success' as const },
  cancelled: { label: '已取消', variant: 'error' as const },
};

export default function OrderList() {
  if (mockOrders.length === 0) {
    return (
      <EmptyState
        title="暂无订单"
        description="快去看看有什么值得买的商品吧"
        action={
          <Link to="/product">
            <Button variant="primary">去购物</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <h1 
        className="text-2xl text-ink-black"
        style={{ fontFamily: "'Noto Serif SC', serif" }}
      >
        我的订单
      </h1>

      {/* Order Tabs */}
      <div className="flex gap-2 pb-4 border-b border-light-gray overflow-x-auto">
        {['全部', '待支付', '待发货', '待收货', '已完成'].map((tab, i) => (
          <button
            key={tab}
            className={`px-4 py-2 text-sm whitespace-nowrap transition-colors ${
              i === 0 ? 'text-gold-sand border-b-2 border-gold-sand' : 'text-warm-gray'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Order List */}
      <div className="space-y-4">
        {mockOrders.map((order) => {
          const status = statusMap[order.status as keyof typeof statusMap];
          return (
            <Link key={order.id} to={`/order/${order.id}`}>
              <Card hover className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-warm-gray">订单号：{order.orderNo}</span>
                  <Badge variant={status.variant}>{status.label}</Badge>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-light-gray rounded-sm" />
                  <div className="flex-1">
                    <p className="text-sm text-ink-black">商品名称</p>
                    <p className="text-warm-gray text-xs mt-0.5">共1件商品</p>
                  </div>
                  <p className="text-gold-sand font-medium">¥{order.totalAmount.toLocaleString()}</p>
                </div>
                <div className="flex justify-end gap-2">
                  {order.status === 'pending' && (
                    <Button variant="outline" size="sm">取消订单</Button>
                  )}
                  {order.status === 'shipped' && (
                    <Button variant="accent" size="sm">确认收货</Button>
                  )}
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
