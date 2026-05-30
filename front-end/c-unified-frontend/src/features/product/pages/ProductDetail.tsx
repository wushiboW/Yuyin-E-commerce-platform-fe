import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@components/Button';
import { Badge } from '@components/Badge';
import { useCartStore } from '@stores/cartStore';

/**
 * ProductDetail Page - 商品详情页
 */
export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: `temp-${Date.now()}`,
      productId: id || '',
      name: '商品名称',
      price: 1280,
      quantity,
      image: undefined,
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Product Images */}
      <div className="space-y-4">
        <div className="aspect-square bg-light-gray rounded-sm" />
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-square bg-light-gray rounded-sm cursor-pointer hover:ring-2 ring-gold-sand" />
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <Badge variant="accent" className="mb-2">新品</Badge>
          <h1 
            className="text-2xl md:text-3xl text-ink-black"
            style={{ fontFamily: "'Noto Serif SC', serif" }}
          >
            商品名称
          </h1>
        </div>

        <div className="space-y-2">
          <p className="text-3xl text-gold-sand font-medium">¥1,280</p>
          <p className="text-warm-gray text-sm">商品描述信息</p>
        </div>

        {/* Specs Selection */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink-black mb-2">规格</label>
            <div className="flex gap-2">
              {['S', 'M', 'L', 'XL'].map((size) => (
                <button
                  key={size}
                  className="w-12 h-12 border border-light-gray hover:border-ink-black transition-colors text-sm"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-ink-black mb-2">数量</label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 border border-light-gray flex items-center justify-center hover:border-ink-black transition-colors"
              >
                -
              </button>
              <span className="text-lg font-medium w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 border border-light-gray flex items-center justify-center hover:border-ink-black transition-colors"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 pt-4">
          <Button variant="outline" className="flex-1">
            加入购物车
          </Button>
          <Button variant="accent" className="flex-1" onClick={handleAddToCart}>
            立即购买
          </Button>
        </div>

        {/* Product Details */}
        <div className="pt-6 border-t border-light-gray">
          <h3 className="text-lg font-medium text-ink-black mb-4" style={{ fontFamily: "'Noto Serif SC', serif" }}>
            商品详情
          </h3>
          <div className="space-y-2 text-warm-gray text-sm">
            <p>材质：优质面料</p>
            <p>产地：上海</p>
            <p>护理说明：请遵循洗涤标签</p>
          </div>
        </div>
      </div>
    </div>
  );
}
