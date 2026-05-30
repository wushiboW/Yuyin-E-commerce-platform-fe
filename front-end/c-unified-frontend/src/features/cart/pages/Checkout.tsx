import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@components/Card';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { useCartStore } from '@stores/cartStore';

/**
 * Checkout Page - 结算页面
 */
export default function Checkout() {
  const navigate = useNavigate();
  const { items, totalQuantity, totalPrice, clearCart } = useCartStore();
  const [address, setAddress] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const handleSubmit = () => {
    // Mock submit order
    clearCart();
    navigate('/order');
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <h1 
        className="text-2xl text-ink-black"
        style={{ fontFamily: "'Noto Serif SC', serif" }}
      >
        确认订单
      </h1>

      {/* Shipping Address */}
      <Card>
        <h2 className="text-lg font-medium text-ink-black mb-4" style={{ fontFamily: "'Noto Serif SC', serif" }}>
          收货地址
        </h2>
        <div className="space-y-4">
          <Input
            label="收货人"
            placeholder="请输入收货人姓名"
            value={address.name}
            onChange={(e) => setAddress({ ...address, name: e.target.value })}
          />
          <Input
            label="手机号"
            placeholder="请输入手机号"
            type="tel"
            value={address.phone}
            onChange={(e) => setAddress({ ...address, phone: e.target.value })}
          />
          <Input
            label="详细地址"
            placeholder="请输入详细地址"
            value={address.address}
            onChange={(e) => setAddress({ ...address, address: e.target.value })}
          />
        </div>
      </Card>

      {/* Order Items */}
      <Card>
        <h2 className="text-lg font-medium text-ink-black mb-4" style={{ fontFamily: "'Noto Serif SC', serif" }}>
          商品清单
        </h2>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-3 py-3 border-b border-light-gray last:border-0">
              <div className="w-16 h-16 bg-light-gray rounded-sm flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-ink-black truncate">{item.name}</p>
                <p className="text-warm-gray text-sm mt-0.5">x{item.quantity}</p>
              </div>
              <p className="text-gold-sand font-medium">¥{(item.price * item.quantity).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Payment Method */}
      <Card>
        <h2 className="text-lg font-medium text-ink-black mb-4" style={{ fontFamily: "'Noto Serif SC', serif" }}>
          支付方式
        </h2>
        <div className="space-y-2">
          <label className="flex items-center gap-3 p-3 border border-gold-sand bg-gold-sand/5 rounded-sm cursor-pointer">
            <input type="radio" name="payment" defaultChecked className="text-gold-sand" />
            <span className="text-sm text-ink-black">微信支付</span>
          </label>
          <label className="flex items-center gap-3 p-3 border border-light-gray rounded-sm cursor-pointer hover:border-paper-brown transition-colors">
            <input type="radio" name="payment" className="text-gold-sand" />
            <span className="text-sm text-ink-black">支付宝</span>
          </label>
        </div>
      </Card>

      {/* Order Summary */}
      <Card>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-warm-gray">商品总价</span>
            <span className="text-ink-black">¥{totalPrice.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-warm-gray">运费</span>
            <span className="text-ink-black">¥0</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-light-gray">
            <span className="text-ink-black font-medium">合计</span>
            <span className="text-xl text-gold-sand font-medium">¥{totalPrice.toLocaleString()}</span>
          </div>
        </div>
      </Card>

      {/* Submit Button */}
      <Button variant="accent" size="lg" fullWidth onClick={handleSubmit}>
        提交订单（¥{totalPrice.toLocaleString()}）
      </Button>
    </div>
  );
}
