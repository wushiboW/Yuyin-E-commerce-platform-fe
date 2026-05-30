import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@components/Card';
import { Badge } from '@components/Badge';
import { Input } from '@components/Input';

/**
 * 商品数据
 */
const products = [
  { id: 1, name: '云逸沙发', price: 12800, category: '家居', isNew: true, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80' },
  { id: 2, name: '静谧长椅', price: 6800, category: '家居', isNew: false, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80' },
  { id: 3, name: '竹韵茶几', price: 4200, category: '家居', isNew: true, image: 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=600&q=80' },
  { id: 4, name: '时光书架', price: 8800, category: '家居', isNew: false, image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600&q=80' },
  { id: 5, name: '悠然屏风', price: 5600, category: '家居', isNew: false, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80' },
  { id: 6, name: '禅意花瓶', price: 1200, category: '配饰', isNew: true, image: 'https://images.unsplash.com/photo-1602164925666-21415a2dd1b7?w=600&q=80' },
  { id: 7, name: '木语边柜', price: 7500, category: '家居', isNew: false, image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80' },
  { id: 8, name: '雅致落地灯', price: 2800, category: '配饰', isNew: true, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80' },
];

const categories = ['全部', '家居', '服饰', '配饰', '生活方式'];

function formatPrice(price: number): string {
  return `¥${price.toLocaleString()}`;
}

/**
 * ProductList Page - 商品列表页
 * 遵循 CLAUDE.md 规范：
 * - 响应式网格：桌面4列、平板3列、移动2列
 * - 极简商品卡片：图片+名称+价格
 * - 克制的营销干扰：去除不必要的促销元素
 */
export default function ProductList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('全部');

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === '全部' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* 页面标题 */}
      <div>
        <p className="text-paper-brown text-xs sm:text-sm tracking-[0.25em] uppercase mb-2 sm:mb-3">
          Collections
        </p>
        <h1
          className="text-2xl sm:text-3xl md:text-4xl text-ink-black"
          style={{ fontFamily: "'Noto Serif SC', serif" }}
        >
          精选商品
        </h1>
      </div>

      {/* 搜索与筛选栏 */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        <Input
          placeholder="搜索商品..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="md:w-80 min-h-[48px]"
        />
        <div className="flex gap-3 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 text-sm transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-ink-black text-moon-white'
                  : 'bg-transparent border border-ink-black/20 text-ink-black hover:border-ink-black'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* 商品网格 - 响应式布局：桌面4列，平板3列，移动2列 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {filteredProducts.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`} className="group block">
            <Card hover padding="none" className="overflow-hidden bg-moon-white">
              {/* 商品图片 */}
              <div className="relative aspect-square overflow-hidden bg-light-gray">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {product.isNew && (
                  <span className="absolute top-3 left-3 px-3 py-1.5 bg-moon-white/95 text-ink-black text-xs">
                    新品
                  </span>
                )}
              </div>

              {/* 商品信息 */}
              <div className="p-4 sm:p-5">
                <h3
                  className="text-sm sm:text-base text-ink-black mb-2 group-hover:text-paper-brown transition-colors duration-300 line-clamp-1"
                  style={{ fontFamily: "'Noto Serif SC', serif" }}
                >
                  {product.name}
                </h3>
                <p className="text-gold-sand font-medium text-base sm:text-lg">
                  {formatPrice(product.price)}
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* 空状态 */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-warm-gray text-base sm:text-lg mb-4">暂无符合条件的商品</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('全部');
            }}
            className="text-paper-brown hover:text-gold-sand transition-colors duration-300 text-sm"
          >
            清除筛选
          </button>
        </div>
      )}

      {/* 加载更多 */}
      {filteredProducts.length > 0 && (
        <div className="flex justify-center py-8 sm:py-12">
          <button className="min-h-[52px] px-12 border border-ink-black text-ink-black hover:bg-ink-black hover:text-moon-white transition-all duration-300 text-sm tracking-wider">
            加载更多
          </button>
        </div>
      )}
    </div>
  );
}