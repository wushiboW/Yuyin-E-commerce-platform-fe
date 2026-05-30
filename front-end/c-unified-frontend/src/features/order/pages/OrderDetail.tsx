import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@components/Card';
import { Button } from '@components/Button';
import { Badge } from '@components/Badge';

/**
 * OrderDetail Page - 订单详情页
 */
export default function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <h1 
        className="text-2xl text-ink-black"
        style={{ fontFamily: "'Noto Serif SC', serif" }}
      >
        订单详情
      </h1>

      {/* Order Status */}
      <Card className="bg-ink-black text-moon-white">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gold-sand/20 flex items-center justify-center">
            <svg className="w-6 h-6 text-gold-sand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="font-medium">订单已发货</p>
            <p className="text-moon-white/60 text-sm mt-0.5">预计3-5天内送达</p>
          </div>
        </div>
      </Card>

      {/* Shipping Address */}
      <Card>
        <h2 className="text-lg font-medium text-ink-black mb-3" style={{ fontFamily: "'Noto Serif SC', serif" }}>
          收货地址
        </h2>
        <div className="text-sm text-warm-gray">
          <p className="text-ink-black font-medium">张三</p>
          <p>138****8888</p>
          <p>上海市浦东新区浦东南路100号</p>
        </div>
      </Card>

      {/* Order Info */}
      <Card>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-warm-gray">订单编号</span>
            <span className="text-ink-black">YY20240529001</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-warm-gray">下单时间</span>
            <span className="text-ink-black">2024-05-29 10:30</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-warm-gray">支付方式</span>
            <span className="text-ink-black">微信支付</span>
          </div>
        </div>
      </Card>

      {/* Products */}
      <Card>
        <h2 className="text-lg font-medium text-ink-black mb-4" style={{ fontFamily: "'Noto Serif SC', serif" }}>
          商品清单
        </h2>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-20 h-20 bg-light-gray rounded-sm flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-ink-black">商品名称</p>
              <p className="text-warm-gray text-sm mt-0.5">规格：M</p>
              <p className="text-warm-gray text-sm">x1</p>
            </div>
            <p className="text-gold-sand font-medium">¥1,280</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-light-gray flex justify-between">
          <span className="text-warm-gray">合计</span>
          <span className="text-xl text-gold-sand font-medium">¥1,280</span>
        </div>
      </Card>

      {/* Actions */}
      <div className="flex gap-4">
        <Button variant="outline" fullWidth onClick={() => navigate(-1)}>
          返回
        </Button>
        <Button variant="accent" fullWidth>
          再次购买
        </Button>
      </div>
    </div>
  );
}
