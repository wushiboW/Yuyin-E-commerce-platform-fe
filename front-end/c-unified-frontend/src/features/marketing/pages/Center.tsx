import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@components/Card';
import { Badge } from '@components/Badge';

/**
 * Marketing Center - 营销活动中心
 */
export default function MarketingCenter() {
  return (
    <div className="space-y-6">
      <h1 
        className="text-2xl text-ink-black"
        style={{ fontFamily: "'Noto Serif SC', serif" }}
      >
        活动中心
      </h1>

      {/* Active Promotions */}
      <section>
        <h2 className="text-lg text-ink-black mb-4" style={{ fontFamily: "'Noto Serif SC', serif" }}>
          正在进行
        </h2>
        <div className="grid gap-4">
          {[1, 2].map((i) => (
            <Link key={i} to={`/marketing/${i}`}>
              <Card hover className="relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-gold-sand text-ink-black text-xs px-2 py-1">
                  限时
                </div>
                <div className="h-32 bg-gradient-to-r from-ink-black to-paper-brown rounded-sm mb-4" />
                <h3 className="text-base font-medium text-ink-black">新品首发特惠</h3>
                <p className="text-warm-gray text-sm mt-1">全场8折起</p>
                <p className="text-gold-sand text-sm mt-2">截止至 2024-06-30</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Upcoming */}
      <section>
        <h2 className="text-lg text-ink-black mb-4" style={{ fontFamily: "'Noto Serif SC', serif" }}>
          即将开始
        </h2>
        <Card>
          <div className="space-y-3">
            {['满减活动', '会员日', '节日特惠'].map((item, i) => (
              <div key={item} className="flex items-center justify-between py-2 border-b border-light-gray last:border-0">
                <span className="text-ink-black">{item}</span>
                <Badge variant="default">即将开始</Badge>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
