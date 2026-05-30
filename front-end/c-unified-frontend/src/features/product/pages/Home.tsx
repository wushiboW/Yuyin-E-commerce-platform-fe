import { Link } from 'react-router-dom';
import { Card } from '@components/Card';
import { useEffect, useRef, useState } from 'react';
import { useNavbar } from '@contexts/NavbarContext';

/**
 * Swiper Hook - 管理轮播逻辑
 */
function useSwiper(slideCount: number, autoPlayInterval = 6000) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef<number>();

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideCount);
  };

  useEffect(() => {
    timerRef.current = window.setInterval(nextSlide, autoPlayInterval);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoPlayInterval]);

  return { currentSlide, goToSlide };
}

/**
 * 滚动渐显动画 Hook
 */
function useFadeInOnScroll(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return { ref, isVisible };
}

/**
 * 分类数据
 */
const categories = [
  {
    name: '家居',
    slug: 'furniture',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    description: '营造舒适的居家空间',
  },
  {
    name: '服饰',
    slug: 'apparel',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80',
    description: '简约质感的衣着美学',
  },
  {
    name: '配饰',
    slug: 'accessories',
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&q=80',
    description: '点缀生活的精致细节',
  },
  {
    name: '生活方式',
    slug: 'lifestyle',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80',
    description: '品味从容的生活态度',
  },
];

/**
 * 精选商品数据
 */
const featuredProducts = [
  { id: 1, name: '云逸沙发', price: 12800, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', category: '家居' },
  { id: 2, name: '静谧长椅', price: 6800, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', category: '家居' },
  { id: 3, name: '竹韵茶几', price: 4200, image: 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=800&q=80', category: '家居' },
  { id: 4, name: '时光书架', price: 8800, image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&q=80', category: '家居' },
];

function formatPrice(price: number): string {
  return `¥${price.toLocaleString()}`;
}

/**
 * 轮播数据 - 5个本地视频轮播
 */
const heroSlides = [
  {
    type: 'video',
    src: '/videos/hero-01.mp4',
    poster: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=90',
    title: '高奢极简',
    subtitle: '东方哲学',
    description: '传承东方美学，融合现代设计，为您营造从容、雅致的生活空间',
    tag: '新品上市',
  },
  {
    type: 'video',
    src: '/videos/hero-02.mp4',
    poster: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=90',
    title: '从容雅致',
    subtitle: '生活美学',
    description: '精选家居系列，让您的家成为心灵栖息的港湾',
    tag: '家居系列',
  },
  {
    type: 'video',
    src: '/videos/hero-03.mp4',
    poster: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&q=90',
    title: '匠心独运',
    subtitle: '品质生活',
    description: '每一件产品都经过精心设计，融合传统工艺与现代审美',
    tag: '工艺系列',
  },
  {
    type: 'video',
    src: '/videos/hero-04.mp4',
    poster: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&q=90',
    title: '静谧自然',
    subtitle: '东方意境',
    description: '在繁忙都市中，为您打造一方宁静天地',
    tag: '限时特惠',
  },
  {
    type: 'video',
    src: '/videos/hero-05.mp4',
    poster: 'https://images.unsplash.com/photo-1602164925666-21415a2dd1b7?w=1920&q=90',
    title: '雅致生活',
    subtitle: '从容自在',
    description: '以简约之手，诠释生活之美，让每一刻都值得珍藏',
    tag: '精选推荐',
  },
];

/**
 * SwiperSlide 组件
 */
function SwiperSlide({ slide, index, isActive }: {
  slide: typeof heroSlides[0];
  index: number;
  isActive: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (slide.type === 'video' && videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive, slide.type]);

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-[1500ms] ease-out ${
        isActive ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {slide.type === 'video' ? (
        <video
          ref={videoRef}
          src={slide.src}
          poster={slide.poster}
          autoPlay={isActive}
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          onLoadedData={() => setVideoLoaded(true)}
        />
      ) : (
        <img
          src={slide.src}
          alt={slide.title}
          className="w-full h-full object-cover"
          loading={index === 0 ? 'eager' : 'lazy'}
        />
      )}
      {/* 多层渐变遮罩 */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink-black/85 via-ink-black/35 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-black/75 via-transparent to-transparent" />
    </div>
  );
}

/**
 * 首页组件 - 全屏沉浸式布局
 */
export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const { currentSlide, goToSlide } = useSwiper(heroSlides.length);
  const categoriesSection = useFadeInOnScroll(0.1);
  const productsSection = useFadeInOnScroll(0.1);
  const storySection = useFadeInOnScroll(0.1);
  const philosophySection = useFadeInOnScroll(0.15);
  const { isAtTop } = useNavbar();

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-moon-white dark:bg-ink-black">
      {/* ===== Hero Swiper轮播Banner ===== */}
      <section ref={heroRef} className={`relative w-full h-screen overflow-hidden bg-transparent transition-all duration-300 ${isAtTop ? '-mt-0' : '-mt-14 sm:-mt-16'}`} style={{ minHeight: '600px' }}>
        {/* Swiper Container */}
        <div className="swiper-container absolute inset-0">
          <div className="swiper-wrapper">
            {heroSlides.map((slide, index) => (
              <div key={index} className="swiper-slide absolute inset-0">
                <SwiperSlide
                  slide={slide}
                  index={index}
                  isActive={currentSlide === index}
                />
              </div>
            ))}
          </div>

          {/* 分页器 */}
          <div className="absolute bottom-10 left-auto right-8 sm:right-12 md:right-16 lg:right-24 z-20 flex gap-4">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-10 sm:w-14 h-[3px] rounded-sm transition-all duration-500 ${
                  currentSlide === index
                    ? 'bg-gold-sand'
                    : 'bg-moon-white/30 hover:bg-moon-white/50'
                }`}
                aria-label={`跳转到第${index + 1}张`}
              />
            ))}
          </div>

          {/* 导航箭头 */}
          <button
            onClick={() => goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length)}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center text-moon-white/50 hover:text-moon-white transition-colors"
            aria-label="上一张"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => goToSlide((currentSlide + 1) % heroSlides.length)}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center text-moon-white/50 hover:text-moon-white transition-colors"
            aria-label="下一张"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* 内容层 */}
        <div className={`relative z-10 h-full flex flex-col justify-end transition-all duration-[1200ms] ease-out ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
          <div className="w-full max-w-[1400px] mx-auto px-8 sm:px-12 md:px-16 lg:px-20 pb-20 sm:pb-24 md:pb-28 lg:pb-32">
            {/* 标签 */}
            <div className="mb-6 sm:mb-8">
              <span className="inline-block px-5 py-2 bg-gold-sand/15 text-gold-sand text-xs sm:text-sm tracking-[0.2em] border border-gold-sand/25">
                {heroSlides[currentSlide].tag}
              </span>
            </div>

            <p className="text-gold-sand text-xs sm:text-sm tracking-[0.5em] uppercase mb-5 sm:mb-6">屿音 YUYIN</p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-moon-white mb-5 sm:mb-6 leading-[1.1]" style={{ fontFamily: "'Noto Serif SC', serif" }}>
              {heroSlides[currentSlide].title}<br />{heroSlides[currentSlide].subtitle}
            </h1>
            <p className="text-moon-white/60 text-base sm:text-lg mb-10 sm:mb-12 max-w-2xl leading-[1.8]">
              {heroSlides[currentSlide].description}
            </p>

            {/* 产品快捷信息 */}
            <div className="flex flex-wrap items-center gap-8 sm:gap-10">
              <div className="flex items-center gap-3 text-moon-white/50 text-sm">
                <span className="w-2.5 h-2.5 bg-gold-sand rounded-full"></span>
                <span>精选家居</span>
              </div>
              <div className="flex items-center gap-3 text-moon-white/50 text-sm">
                <span className="w-2.5 h-2.5 bg-gold-sand/60 rounded-full"></span>
                <span>服饰配饰</span>
              </div>
              <div className="flex items-center gap-3 text-moon-white/50 text-sm">
                <span className="w-2.5 h-2.5 bg-gold-sand/30 rounded-full"></span>
                <span>生活方式</span>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧产品信息卡片 */}
        <div className="absolute right-8 sm:right-12 md:right-16 lg:right-24 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
          <div className="w-72 p-8 bg-moon-white/10 backdrop-blur-md border border-moon-white/15">
            <p className="text-gold-sand/80 text-[11px] tracking-[0.3em] mb-4">FEATURED</p>
            <h3 className="text-moon-white text-xl mb-3" style={{ fontFamily: "'Noto Serif SC', serif" }}>
              云逸沙发
            </h3>
            <p className="text-moon-white/50 text-sm mb-5 leading-relaxed">
              简约设计，舒适体验
            </p>
            <p className="text-gold-sand text-2xl font-medium">
              ¥12,800
            </p>
          </div>
        </div>

        {/* 滚动提示 */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-moon-white/40">
          <span className="text-[10px] tracking-[0.4em] mb-4">SCROLL</span>
          <div className="w-px h-14 bg-gradient-to-b from-moon-white/40 to-transparent" />
        </div>
      </section>

      {/* ===== 精选分类 - 全宽铺满 ===== */}
      <section
        ref={categoriesSection.ref}
        className={`w-full py-24 sm:py-28 md:py-32 lg:py-40 bg-moon-white dark:bg-ink-black transition-all duration-700 ease-out ${categoriesSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <div className="w-full max-w-[1600px] mx-auto px-8 sm:px-12 md:px-16 lg:px-20">
          <div className="text-center mb-16 sm:mb-20 md:mb-24">
            <p className="text-paper-brown dark:text-gold-sand text-xs sm:text-sm tracking-[0.3em] uppercase mb-4 sm:mb-5">Collections</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-ink-black dark:text-moon-white" style={{ fontFamily: "'Noto Serif SC', serif" }}>精选分类</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
            {categories.map((cat, i) => (
              <Link key={cat.slug} to={`/product?category=${cat.slug}`} className="group block">
                <div
                  className={`relative aspect-[4/5] overflow-hidden mb-4 sm:mb-5 transition-all duration-500 ease-out ${categoriesSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${200 + i * 100}ms` }}
                >
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="text-center px-2">
                  <h3 className="text-base sm:text-lg md:text-xl text-ink-black dark:text-moon-white mb-2 group-hover:text-paper-brown dark:group-hover:text-gold-sand transition-colors duration-300" style={{ fontFamily: "'Noto Serif SC', serif" }}>{cat.name}</h3>
                  <p className="text-warm-gray dark:text-white/50 text-xs sm:text-sm hidden sm:block">{cat.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 精选商品 - 全宽铺满 ===== */}
      <section
        ref={productsSection.ref}
        className={`w-full py-24 sm:py-28 md:py-32 lg:py-40 bg-ivory/40 dark:bg-ink-black transition-all duration-700 ease-out ${productsSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <div className="w-full max-w-[1600px] mx-auto px-8 sm:px-12 md:px-16 lg:px-20">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-16 sm:mb-20 md:mb-24">
            <div className="mb-6 sm:mb-0">
              <p className="text-paper-brown dark:text-gold-sand text-xs sm:text-sm tracking-[0.3em] uppercase mb-4 sm:mb-5">Featured</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl text-ink-black dark:text-moon-white" style={{ fontFamily: "'Noto Serif SC', serif" }}>精选商品</h2>
            </div>
            <Link to="/product" className="text-paper-brown hover:text-gold-sand transition-colors duration-300 inline-flex items-center gap-3 group text-sm sm:text-base sm:self-end">
              查看全部<span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
            {featuredProducts.map((prod, i) => (
              <Link key={prod.id} to={`/product/${prod.id}`} className="group block">
                <div
                  className={`transition-all duration-500 ease-out ${productsSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <Card hover padding="none" className="overflow-hidden bg-moon-white dark:bg-ink-black">
                    <div className="relative aspect-square overflow-hidden bg-light-gray dark:bg-white/10">
                      <img src={prod.image} alt={prod.name} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                      <span className="absolute top-3 left-3 sm:top-4 sm:left-4 px-3 py-1.5 bg-moon-white/95 dark:bg-ink-black/90 text-ink-black dark:text-moon-white text-xs">{prod.category}</span>
                    </div>
                    <div className="p-4 sm:p-5 md:p-6">
                      <h3 className="text-sm sm:text-base md:text-lg text-ink-black dark:text-moon-white mb-2 sm:mb-3 group-hover:text-paper-brown dark:group-hover:text-gold-sand transition-colors duration-300 line-clamp-1" style={{ fontFamily: "'Noto Serif SC', serif" }}>{prod.name}</h3>
                      <p className="text-gold-sand font-medium text-base sm:text-lg">{formatPrice(prod.price)}</p>
                    </div>
                  </Card>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 品牌故事 - 全宽铺满 ===== */}
      <section
        ref={storySection.ref}
        className={`w-full py-24 sm:py-28 md:py-32 lg:py-40 bg-moon-white dark:bg-ink-black transition-all duration-700 ease-out ${storySection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <div className="w-full max-w-[1600px] mx-auto px-8 sm:px-12 md:px-16 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=1200&q=85" alt="屿音品牌故事" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold-sand/30 -z-10 hidden lg:block" />
            </div>

            <div className="lg:pl-4 xl:pl-8">
              <p className="text-paper-brown dark:text-gold-sand text-xs sm:text-sm tracking-[0.3em] uppercase mb-4 sm:mb-5">Our Story</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl text-ink-black dark:text-moon-white mb-6 sm:mb-8" style={{ fontFamily: "'Noto Serif SC', serif" }}>关于屿音</h2>
              <div className="space-y-5 sm:space-y-6 text-warm-gray dark:text-white/60 leading-[1.9] text-sm sm:text-base">
                <p>屿音，源自对东方美学的深度理解与传承。我们相信，真正的奢华不在于繁复的装饰，而在于恰到好处的克制与从容。</p>
                <p>每一件产品都经过精心设计，融合传统工艺与现代审美，为您营造一个能够沉淀心灵、回归本真的生活空间。</p>
              </div>
              <Link to="/about" className="inline-flex items-center gap-3 mt-8 sm:mt-10 text-paper-brown dark:text-gold-sand hover:text-gold-sand dark:hover:text-moon-white transition-colors duration-300 group text-sm sm:text-base">
                <span>探索更多</span><span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 生活理念 - 全屏沉浸式深色模块 ===== */}
      <section
        ref={philosophySection.ref}
        className={`relative w-full py-32 sm:py-40 md:py-48 lg:py-56 overflow-hidden transition-all duration-700 ease-out ${philosophySection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=85" alt="屿音生活美学" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-ink-black/75" />
        </div>

        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-8 sm:px-12 md:px-16 text-center">
          <p className="text-gold-sand text-xs sm:text-sm tracking-[0.4em] uppercase mb-6 sm:mb-8">Philosophy</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-moon-white mb-6 sm:mb-8 leading-[1.2]" style={{ fontFamily: "'Noto Serif SC', serif" }}>简约即丰盛</h2>
          <p className="text-moon-white/70 text-base sm:text-lg leading-[1.9] max-w-2xl mx-auto mb-10 sm:mb-12">
            在这个物质丰盈的时代，我们选择回归本质。<br className="hidden sm:block" />用克制的手法诠释生活的丰盛，以留白的方式呈现心灵的充盈。
          </p>
          <Link to="/product" className="inline-flex items-center gap-3 text-moon-white border border-moon-white/50 px-10 py-4 hover:bg-moon-white hover:text-ink-black transition-all duration-300 text-sm sm:text-base" style={{ fontFamily: "'Noto Sans SC', sans-serif", letterSpacing: '0.05em' }}>
            <span>走进屿音</span><span>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}