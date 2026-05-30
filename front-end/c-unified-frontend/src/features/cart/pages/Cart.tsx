import { Link } from 'react-router-dom';
import { Card } from '@components/Card';
import { Button } from '@components/Button';
import { EmptyState } from '@components/EmptyState';
import { useCartStore } from '@stores/cartStore';

/**
 * Cart Page - 购物车页面
 */
export default function Cart() {
  const { items, totalQuantity, totalPrice, updateQuantity, removeItem } = useCartStore();

  if (items.length === 0) {
    return (
      <EmptyState
        title="购物车是空的"
        description="去看看有什么喜欢的商品吧"
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
        购物车
      </h1>

      {/* Cart Items */}
      <div className="space-y-4">
        {items.map((item) => (
          <Card key={item.id} className="flex gap-4">
            <div className="w-24 h-24 bg-light-gray rounded-sm flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-medium text-ink-black truncate">{item.name}</h3>
              <p className="text-gold-sand font-medium mt-1">¥{item.price.toLocaleString()}</p>
              
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="w-8 h-8 border border-light-gray flex items-center justify-center hover:border-ink-black transition-colors text-sm"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 border border-light-gray flex items-center justify-center hover:border-ink-black transition-colors text-sm"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-warm-gray hover:text-red-500 transition-colors text-sm"
                >
                  删除
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Summary */}
      <Card className="sticky bottom-20 md:bottom-0">
        <div className="flex items-center justify-between mb-4">
          <span className="text-warm-gray">
            共 {totalQuantity} 件商品
          </span>
          <div>
            <span className="text-warm-gray">合计：</span>
            <span className="text-2xl text-gold-sand font-medium">
              ¥{totalPrice.toLocaleString()}
            </span>
          </div>
        </div>
        <Link to="/checkout">
          <Button variant="accent" fullWidth size="lg">
            去结算
          </Button>
        </Link>
      </Card>
    </div>
  );
}
