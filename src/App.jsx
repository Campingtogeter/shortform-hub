import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Music2,
  ExternalLink,
  Sparkles,
  Play,
  X,
  Edit3,
  Trash2,
  ShoppingBag,
  Share2,
  Camera,
  Globe,
  CreditCard,
  ShieldCheck,
  Truck,
  CheckCircle2,
  ChevronLeft,
  Plus,
  Minus,
  Lock,
  Unlock,
  FileText,
  Package,
  MousePointerClick,
  Database,
  RefreshCw,
  KeyRound,
  BarChart3,
  Building2,
  Wand2,
  Loader2,
  Upload,
  Languages,
  AlertCircle,
} from 'lucide-react';

// --- 초기 샘플 상품 데이터 ---
const INITIAL_PRODUCTS = [
  {
    id: 'item-106-a',
    post_id: 'post-106',
    item_code: '106-A',
    sale_type: 'direct',
    source_type: 'manual', // 'homepage' | 'platform' | 'manual'
    name: '카시오페아 (L) 아웃도어 티타늄 화목난로',
    name_en: 'Cassiopeia (L) Outdoor Titanium Wood Stove',
    description: '초경량 폴딩 설계와 내열 유리창을 적용한 사계절 프리미엄 백패킹·캠핑 화목난로',
    description_en:
      'Ultra-lightweight folding titanium camping wood stove with heat-resistant panoramic glass window for all-season outdoor adventures.',
    price: 129000,
    price_usd: 95,
    options: ['본체 단품 + 전용 가방', '연통 연장 풀세트 (+25,000원)', '스파크 어레스터 패키지'],
    options_en: [
      'Stove Body + Carry Bag',
      'Full Chimney Extension Set (+$19)',
      'Spark Arrestor Package',
    ],
    image_url:
      'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=800&q=80',
    gallery_images: [
      'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=800&q=80',
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80',
      'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&q=80',
    ],
    detail_blocks: [
      {
        id: 'blk-1',
        title: '초경량 순수 티타늄 바디 & 1분 폴딩 시스템',
        title_en: 'Ultra-Light Pure Titanium Body & 1-Minute Folding',
        content:
          '장갑을 낀 상태에서도 1분 만에 조립 및 해체가 가능하며, 고온에서도 변형이 적은 고강도 티타늄 합금 소재를 채택해 백패킹과 오토캠핑 모두에 최적화되었습니다.',
        content_en:
          'Assemble or pack down in under 1 minute even with gloves on. Crafted from high-grade titanium alloy that resists warping under extreme heat.',
        image:
          'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80',
      },
      {
        id: 'blk-2',
        title: '고투명 내열 세라믹 불멍 뷰잉 윈도우',
        title_en: 'High-Clarity Heat-Resistant Ceramic Fire Viewing Glass',
        content:
          '1,000℃ 이상의 고열을 견디는 독일 쇼트(SCHOTT) 규격 세라믹 글라스를 적용하여 텐트 안에서도 안전하고 선명하게 불멍을 즐길 수 있습니다.',
        content_en:
          'Equipped with thermal shock-resistant ceramic glass rated over 1,000°C, offering a crystal-clear fireplace view inside your tent.',
        image:
          'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&q=80',
      },
    ],
    specs: [
      { label: '소재 (Material)', value: 'Grade 1 Titanium / 내열 세라믹 글라스' },
      { label: '무게 (Weight)', value: '1.85 kg (연통 포함 풀세트)' },
      { label: '조립 크기 (Dimensions)', value: '380 × 200 × 190 mm (연통 높이 2.4m)' },
      { label: '글로벌 배송 (Global Shipping)', value: 'DHL / EMS 전 세계 발송 가능 (3~7일)' },
    ],
    purchase_url: 'https://campingtogether.example.com/products/cassiopeia-l',
    third_party_payment_url: 'https://buy.stripe.com/test_cassiopeia_krw',
    third_party_payment_url_en:
      'https://www.paypal.com/checkoutnow?token=demo_cassiopeia_usd',
    payment_provider: 'Stripe / PayPal / Toss',
    badge_text: '자체 제작 단독특가',
    badge_text_en: 'Exclusive Direct Deal',
    click_count: 934,
    is_new: true,
    shortform_posts: {
      id: 'post-106',
      video_number: 106,
      platform: 'instagram',
      title: '영하 15도 설중캠핑 텐트 안을 훈훈하게 만든 괴물 화목난로',
      title_en: 'Winter Camping Wood Stove That Turns a -15°C Tent Into a Cozy Cabin',
      video_url: 'https://www.instagram.com',
      ai_summary:
        '• 홈페이지 없이 직접 촬영한 실물 사진과 상세 스펙으로 구성된 독립 판매 상품\n• 국내(원화) 및 해외(USD) 제3자 온라인 안전 결제 폼 즉시 연동\n• 전 세계 해외 배송 주소(영문) 입력 및 다국어 페이지 완벽 지원',
      ai_summary_en:
        '• Standalone direct product page built with custom studio photos & rich specs\n• Instant checkout via 3rd-party online payment form (Stripe, PayPal, Global Card)\n• Supports international shipping address format and English/Korean switch',
      tags: ['동계캠핑', '화목난로', '카시오페아', '백패킹장비'],
    },
  },
  {
    id: 'item-105-a',
    post_id: 'post-105',
    item_code: '105-A',
    sale_type: 'direct',
    source_type: 'homepage',
    name: '바누스 무전원 중력식 펠릿 난로 풀세트',
    name_en: 'Banus Gravity-Fed Non-Electric Pellet Stove Full Set',
    description: '전기 없이도 연료 자동 공급! 연기 걱정 없는 고효율 불멍 캠핑 펠릿 히터',
    description_en:
      'Automatic gravity-fed fuel supply without electricity! Smokeless high-efficiency outdoor pellet heater.',
    price: 310000,
    price_usd: 229,
    options: ['블랙 에디션 풀세트', '스테인리스 실버 풀세트', '전용 펠릿 20kg 추가 (+18,000원)'],
    options_en: [
      'Black Edition Full Set',
      'Stainless Silver Full Set',
      'Add 20kg Wood Pellets (+$14)',
    ],
    image_url:
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=800&q=80',
    gallery_images: [
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=800&q=80',
      'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?w=800&q=80',
    ],
    detail_blocks: [
      {
        id: 'blk-105-1',
        title: '연기 없는 2차 연소 시스템 & 대용량 펠릿 호퍼',
        title_en: 'Smokeless Secondary Combustion & Large Pellet Hopper',
        content:
          '한 번 충전으로 최대 6시간 연속 연소가 가능하며, 2차 연소 구조로 매연과 재 날림을 획기적으로 줄였습니다.',
        content_en:
          'Up to 6 hours of continuous burn on a single fill with minimal smoke and ash thanks to secondary airflow combustion.',
        image:
          'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?w=800&q=80',
      },
    ],
    specs: [
      { label: '연료 방식 (Fuel Type)', value: '목재 펠릿 (Wood Pellet 6~8mm)' },
      { label: '연속 연소 시간 (Burn Time)', value: '최대 5~6시간 (호퍼 5kg 기준)' },
      { label: '제조국 (Origin)', value: '대한민국 (Made in Korea)' },
    ],
    purchase_url: 'https://campingtogether.example.com/products/banus-stove',
    third_party_payment_url: 'https://buy.stripe.com/test_banus_krw',
    third_party_payment_url_en:
      'https://www.paypal.com/checkoutnow?token=demo_banus_usd',
    payment_provider: 'Toss Payments / PayPal',
    badge_text: '릴스 화제 상품',
    badge_text_en: 'Reels Best Seller',
    click_count: 780,
    is_new: true,
    shortform_posts: {
      id: 'post-105',
      video_number: 105,
      platform: 'instagram',
      title: '장작 패느라 힘빼지 마세요! 부어두면 알아서 타는 바누스 펠릿난로',
      title_en: 'Stop Chopping Firewood! Gravity-Fed Banus Pellet Stove',
      video_url: 'https://www.instagram.com',
      ai_summary:
        '• 자사 홈페이지 메타데이터 연동 및 직접 상세 이미지 추가 구성\n• 무전원 중력식 펠릿 공급으로 밤새 끊김 없는 난방 유지\n• 국내외 제3자 온라인 결제 링크를 통한 원클릭 카드·간편결제 지원',
      ai_summary_en:
        '• Imported from official brand homepage with enhanced photo gallery\n• Non-electric gravity feed keeps your campsite warm all night\n• One-click global checkout via 3rd-party payment link',
      tags: ['바누스펠릿난로', '캠핑난로', '불멍히터', '감성캠핑'],
    },
  },
  {
    id: 'item-104-a',
    post_id: 'post-104',
    item_code: '104-A',
    sale_type: 'direct',
    source_type: 'platform',
    name: '초소형 맥세이프 3in1 접이식 고속 무선충전기',
    name_en: 'Ultra-Compact MagSafe 3-in-1 Foldable Wireless Charger',
    description: '아이폰·애플워치·에어팟 동시 충전! 여행용 파우치에 쏙 들어가는 초슬림 거치대',
    description_en:
      'Charge iPhone, Apple Watch, and AirPods simultaneously! Pocket-sized foldable travel charging station.',
    price: 34900,
    price_usd: 26,
    options: ['화이트 (단품)', '스페이스 블랙 (단품)', '화이트 2개 세트 (추가할인)'],
    options_en: ['White (Single)', 'Space Black (Single)', 'White Twin Pack (Save 15%)'],
    image_url:
      'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=700&q=80',
    gallery_images: [
      'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=700&q=80',
    ],
    detail_blocks: [],
    specs: [
      { label: '최대 출력 (Output)', value: '15W MagSafe + 5W Watch + 5W Earbuds' },
      { label: '입력 포트 (Input)', value: 'USB-C PD 30W 권장' },
    ],
    purchase_url: 'https://www.coupang.com',
    third_party_payment_url: 'https://buy.stripe.com/test_magsafe_krw',
    third_party_payment_url_en: 'https://buy.stripe.com/test_magsafe_usd',
    payment_provider: 'Stripe / Apple Pay',
    badge_text: '릴스 공구 특가',
    badge_text_en: 'Group Buy Special',
    click_count: 842,
    is_new: false,
    shortform_posts: {
      id: 'post-104',
      video_number: 104,
      platform: 'instagram',
      title: '책상 위 충전선 정리 한 번에 끝내는 데스크테리어 꿀템',
      title_en: 'Clean Up Your Desk Cables Instantly With One Foldable Charger',
      video_url: 'https://www.instagram.com',
      ai_summary:
        '• 케이블 3개를 하나로 줄여주는 초슬림 접이식 디자인\n• 맥세이프 강력한 자력으로 가로·세로 거치 모두 안정적\n• 출장이나 해외여행 시 필수 휴대용 충전 스테이션으로 추천',
      ai_summary_en:
        '• Replaces 3 tangled cables with a single ultra-slim folding pad\n• Strong magnetic hold supports both portrait and landscape standby\n• Essential compact charging station for business trips and global travel',
      tags: ['데스크테리어', '맥세이프충전기', '여행필수템', '릴스추천템'],
    },
  },
];

// Supabase 상품 목록 조회
async function apiFetchProducts(sbUrl, sbKey) {
  const cleanUrl = sbUrl.replace(/\/$/, '');
  const res = await fetch(
    `${cleanUrl}/rest/v1/product_items?select=*,shortform_posts(*)&is_active=eq.true&order=created_at.desc`,
    {
      headers: {
        apikey: sbKey,
        Authorization: `Bearer ${sbKey}`,
      },
    }
  );
  if (!res.ok) throw new Error('Supabase 상품 조회 실패');
  return res.json();
}

// Supabase 직접 판매 주문 생성
async function apiCreateDirectOrder(sbUrl, sbKey, orderPayload) {
  const cleanUrl = sbUrl.replace(/\/$/, '');
  const res = await fetch(`${cleanUrl}/rest/v1/direct_orders`, {
    method: 'POST',
    headers: {
      apikey: sbKey,
      Authorization: `Bearer ${sbKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify(orderPayload),
  });
  if (!res.ok) throw new Error('주문 저장 실패');
  return res.json();
}

// Supabase 직접 판매 주문 내역 조회
async function apiFetchDirectOrders(sbUrl, sbKey) {
  const cleanUrl = sbUrl.replace(/\/$/, '');
  const res = await fetch(
    `${cleanUrl}/rest/v1/direct_orders?select=*&order=created_at.desc`,
    {
      headers: {
        apikey: sbKey,
        Authorization: `Bearer ${sbKey}`,
      },
    }
  );
  if (!res.ok) return [];
  return res.json();
}

// Supabase 주문 상태 변경
async function apiUpdateOrderStatus(sbUrl, sbKey, orderId, orderStatus) {
  const cleanUrl = sbUrl.replace(/\/$/, '');
  await fetch(`${cleanUrl}/rest/v1/direct_orders?id=eq.${orderId}`, {
    method: 'PATCH',
    headers: {
      apikey: sbKey,
      Authorization: `Bearer ${sbKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ order_status: orderStatus }),
  });
}

// --- 플랫폼 아이콘 ---
const InstagramIcon = ({ className = 'w-3 h-3' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YoutubeIcon = ({ className = 'w-3 h-3' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

// --- StoreView ---
function StoreView({
  products,
  lang = 'ko',
  isAdmin,
  onProductClick,
  onOpenDirectShop,
  onOpenManualCreate,
  onEditProduct,
  onDeleteProduct,
  onCopyShopLink,
}) {
  const isEn = lang === 'en';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [expandedSummaryId, setExpandedSummaryId] = useState(null);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const post = item.shortform_posts;
      const platformOk =
        selectedPlatform === 'all' || post?.platform === selectedPlatform;
      const q = searchQuery.trim().toLowerCase();
      if (!q) return platformOk;

      const cleanNum = q.replace(/^#/, '');
      const vNum = String(post?.video_number || '');
      const iCode = (item.item_code || '').toLowerCase();
      const name = (item.name || '').toLowerCase();
      const nameEn = (item.name_en || '').toLowerCase();
      const title = (post?.title || '').toLowerCase();
      const tags = (post?.tags || []).join(' ').toLowerCase();

      return (
        platformOk &&
        (vNum.includes(cleanNum) ||
          iCode.includes(q) ||
          name.includes(q) ||
          nameEn.includes(q) ||
          title.includes(q) ||
          tags.includes(q))
      );
    });
  }, [products, searchQuery, selectedPlatform]);

  const renderPlatformBadge = (plat) => {
    switch (plat) {
      case 'instagram':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-pink-600">
            <InstagramIcon className="w-3.5 h-3.5" /> Reels
          </span>
        );
      case 'tiktok':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-zinc-900">
            <Music2 className="w-3.5 h-3.5" /> TikTok
          </span>
        );
      case 'youtube':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600">
            <YoutubeIcon className="w-3.5 h-3.5" /> Shorts
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-zinc-500">
            Featured
          </span>
        );
    }
  };

  return (
    <main className="max-w-5xl mx-auto px-4 pt-12 pb-24">
      {/* 프리미엄 미니멀 히어로 */}
      <div className="flex flex-col items-center text-center mb-12 space-y-4">
        <h1 className="text-4xl sm:text-6xl font-black tracking-tighter text-zinc-900">
          {isEn ? 'Featured Collection' : '공식 스토어'}
        </h1>
        <p className="text-sm sm:text-base text-zinc-500 max-w-md">
          {isEn
            ? 'Discover the exact products featured in our videos. Direct checkout available.'
            : '영상에서 본 바로 그 상품, 빠르고 간편하게 확인하고 결제하세요.'}
        </p>

        {isAdmin && (
          <div className="pt-2">
            <button
              onClick={onOpenManualCreate}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold transition-all shadow-md hover:shadow-lg"
            >
              <Plus className="w-4 h-4" />
              {isEn ? 'Add New Product' : '새 상품 등록하기'}
            </button>
          </div>
        )}
      </div>

      {/* 미니멀 검색 및 필터 */}
      <div className="sticky top-20 z-30 bg-zinc-50/90 backdrop-blur-xl py-4 border-b border-zinc-200/50 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-xs">
            <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isEn ? 'Search item or #...' : '상품명 또는 영상 번호...'}
              className="w-full pl-10 pr-10 py-2.5 bg-white border border-zinc-200 rounded-full text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 transition-colors shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-900"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
            {[
              { id: 'all', label: isEn ? 'All' : '전체' },
              { id: 'instagram', label: 'Reels' },
              { id: 'tiktok', label: 'TikTok' },
              { id: 'youtube', label: 'Shorts' },
            ].map((plat) => (
              <button
                key={plat.id}
                onClick={() => setSelectedPlatform(plat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  selectedPlatform === plat.id
                    ? 'bg-zinc-900 text-white shadow-md'
                    : 'bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200'
                }`}
              >
                {plat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 상품 갤러리 그리드 */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-sm font-semibold text-zinc-400">
            {isEn ? 'No products found.' : '검색 결과가 없습니다.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {filteredProducts.map((item) => {
            const post = item.shortform_posts;
            const isSummaryOpen = expandedSummaryId === item.id;
            const isDirectSale = item.sale_type === 'direct';

            const displayTitle = isEn ? item.name_en || item.name : item.name;
            const displayDesc = isEn
              ? item.description_en || item.description
              : item.description;
            const displayBadge = isEn
              ? item.badge_text_en || item.badge_text
              : item.badge_text;
            const displaySummary = isEn
              ? post?.ai_summary_en || post?.ai_summary
              : post?.ai_summary;

            const priceKrw = Number(item.price) || 0;
            const priceUsd =
              Number(item.price_usd) ||
              (priceKrw > 0 ? Math.max(1, Math.round(priceKrw / 1380)) : 0);

            return (
              <article key={item.id} className="group flex flex-col">
                <div
                  onClick={() => onOpenDirectShop(item)}
                  className="relative aspect-[4/5] bg-zinc-100 rounded-3xl overflow-hidden cursor-pointer shadow-sm group-hover:shadow-xl transition-all duration-500"
                >
                  <img
                    src={
                      item.image_url ||
                      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&q=80'
                    }
                    alt={displayTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* 세련된 뱃지 오버레이 */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    <span className="bg-white/90 backdrop-blur-md text-zinc-900 px-3 py-1.5 rounded-full text-xs font-black shadow-sm">
                      #{post?.video_number || '-'}
                    </span>
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm">
                      {renderPlatformBadge(post?.platform)}
                    </div>
                  </div>

                  {displayBadge && (
                    <div className="absolute bottom-4 left-4">
                      <span className="inline-flex items-center gap-1 bg-zinc-900 text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 rounded-full shadow-md">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        {displayBadge}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h2
                        onClick={() => onOpenDirectShop(item)}
                        className="text-base font-bold text-zinc-900 leading-snug cursor-pointer group-hover:text-zinc-600 transition-colors line-clamp-2"
                      >
                        {displayTitle}
                      </h2>
                      {displayDesc && (
                        <p className="text-sm text-zinc-500 mt-1.5 line-clamp-1">
                          {displayDesc}
                        </p>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      {priceKrw > 0 ? (
                        <span className="text-lg font-black tracking-tight text-zinc-900">
                          {isEn
                            ? `$${priceUsd.toLocaleString()}`
                            : `${priceKrw.toLocaleString()}원`}
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-zinc-400">Info</span>
                      )}
                    </div>
                  </div>

                  {displaySummary && (
                    <div className="mt-3">
                      <button
                        onClick={() => setExpandedSummaryId(isSummaryOpen ? null : item.id)}
                        className="text-[11px] font-bold text-zinc-500 hover:text-zinc-900 transition-colors flex items-center gap-1"
                      >
                        {isSummaryOpen ? '- Close details' : '+ View AI Highlights'}
                      </button>
                      {isSummaryOpen && (
                        <div className="mt-2 p-3 rounded-2xl bg-zinc-100 text-xs text-zinc-600 whitespace-pre-line leading-relaxed">
                          {displaySummary}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* 하단 액션 버튼 그룹 */}
                <div className="mt-5 pt-4 border-t border-zinc-200/60 flex items-center gap-2">
                  <button
                    onClick={() => {
                      onProductClick(item);
                      onOpenDirectShop(item);
                    }}
                    className="flex-1 py-3 px-4 bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-bold rounded-full transition-all text-center"
                  >
                    {isEn ? 'View Product' : '자세히 보기'}
                  </button>

                  <button
                    onClick={() => onCopyShopLink(item)}
                    className="p-3 bg-white border border-zinc-200 hover:border-zinc-400 text-zinc-900 rounded-full transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  
                  {!isDirectSale && item.purchase_url && (
                    <a
                      href={item.purchase_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white border border-zinc-200 hover:border-zinc-400 text-zinc-900 rounded-full transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

                {/* 관리자 툴 */}
                {isAdmin && (
                  <div className="flex items-center justify-end gap-2 mt-3">
                    <span className="text-[10px] font-semibold text-zinc-400 mr-auto">
                      Views: {item.click_count || 0}
                    </span>
                    <button
                      onClick={() => onEditProduct(item)}
                      className="p-2 text-zinc-400 hover:text-zinc-900 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteProduct(item)}
                      className="p-2 text-zinc-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}

// --- DirectShopView ---
function DirectShopView({
  product,
  lang = 'ko',
  onToggleLang,
  refPlatform = 'shortform',
  bankAccountInfo,
  thirdPartyDefaultUrl = '',
  onBackToStore,
  onSubmitOrder,
  onShowToast,
}) {
  const isEn = lang === 'en';
  const post = product?.shortform_posts;

  const localizedOptions = isEn
    ? Array.isArray(product?.options_en) && product.options_en.length > 0
      ? product.options_en
      : Array.isArray(product?.options) && product.options.length > 0
      ? product.options
      : ['Standard Option (1 pc)']
    : Array.isArray(product?.options) && product.options.length > 0
    ? product.options
    : ['기본 구성 (1개)'];

  const gallery =
    Array.isArray(product?.gallery_images) && product.gallery_images.length > 0
      ? product.gallery_images
      : product?.image_url
      ? [product.image_url]
      : ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'];

  const [activeImage, setActiveImage] = useState(gallery[0]);
  const [isOrderSheetOpen, setIsOrderSheetOpen] = useState(false);
  const [isThirdPartyModalOpen, setIsThirdPartyModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(localizedOptions[0]);
  const [quantity, setQuantity] = useState(1);

  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [buyerCountry, setBuyerCountry] = useState(
    isEn ? 'United States' : '대한민국 (South Korea)'
  );
  const [shippingAddress, setShippingAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [deliveryMemo, setDeliveryMemo] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('third_party_form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  useEffect(() => {
    setActiveImage(gallery[0]);
    setSelectedOption(localizedOptions[0]);
    setBuyerCountry(isEn ? 'United States' : '대한민국 (South Korea)');
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [product, lang]);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <p className="text-base font-bold text-zinc-500 mb-6">
          {isEn ? 'Product not found.' : '해당 상품 정보를 찾을 수 없습니다.'}
        </p>
        <button
          onClick={onBackToStore}
          className="px-6 py-3 rounded-full bg-zinc-900 text-white text-sm font-bold shadow-lg"
        >
          {isEn ? 'Return to Store' : '스토어로 돌아가기'}
        </button>
      </div>
    );
  }

  const displayTitle = isEn ? product.name_en || product.name : product.name;
  const displayDesc = isEn
    ? product.description_en || product.description
    : product.description;
  const displayBadge = isEn
    ? product.badge_text_en || product.badge_text
    : product.badge_text;
  const displaySummary = isEn
    ? post?.ai_summary_en || post?.ai_summary
    : post?.ai_summary;

  const unitPriceKrw = Number(product.price) || 0;
  const unitPriceUsd =
    Number(product.price_usd) ||
    (unitPriceKrw > 0 ? Math.max(1, Math.round(unitPriceKrw / 1380)) : 0);

  const deliveryFeeKrw =
    unitPriceKrw * quantity >= 50000 || unitPriceKrw === 0 ? 0 : 3000;
  const deliveryFeeUsd =
    unitPriceUsd * quantity >= 100 || unitPriceUsd === 0 ? 0 : 15;

  const totalKrw = unitPriceKrw * quantity + deliveryFeeKrw;
  const totalUsd = unitPriceUsd * quantity + deliveryFeeUsd;

  const formatMoney = (krw, usd) => {
    if (isEn) return `$${Number(usd).toLocaleString()} USD`;
    return `${Number(krw).toLocaleString()}원`;
  };

  const activeThirdPartyUrl = isEn
    ? product.third_party_payment_url_en ||
      product.third_party_payment_url ||
      thirdPartyDefaultUrl
    : product.third_party_payment_url || thirdPartyDefaultUrl;

  const handleCopyDirectUrl = (targetLang = lang) => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?shop=${
      post?.video_number || ''
    }&lang=${targetLang}`;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(shareUrl);
    }
    onShowToast(
      targetLang === 'en'
        ? 'URL copied to clipboard!'
        : `판매페이지 링크가 복사되었습니다.`
    );
  };

  const handleOrderFormSubmit = async (e) => {
    e.preventDefault();
    if (!buyerName.trim() || !buyerPhone.trim() || !shippingAddress.trim()) {
      onShowToast(
        isEn
          ? 'Please fill in required shipping fields.'
          : '받는 분 성함, 연락처, 배송지를 확인해 주세요.'
      );
      return;
    }

    if (paymentMethod === 'third_party_form' || paymentMethod === 'global_card') {
      setIsThirdPartyModalOpen(true);
      return;
    }

    await finalizeOrderSubmission('pending_payment');
  };

  const finalizeOrderSubmission = async (status = 'paid') => {
    setIsSubmitting(true);
    const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;
    const newOrder = {
      order_number: orderNumber,
      product_id:
        String(product.id).startsWith('item-') || String(product.id).startsWith('local-')
          ? null
          : product.id,
      product_name: displayTitle,
      selected_option: selectedOption,
      quantity,
      currency: isEn ? 'USD' : 'KRW',
      total_price: totalKrw,
      total_price_usd: totalUsd,
      buyer_name: buyerName.trim(),
      buyer_email: buyerEmail.trim(),
      buyer_phone: buyerPhone.trim(),
      buyer_country: buyerCountry.trim(),
      shipping_address: `${shippingAddress.trim()} ${
        postalCode ? `(${postalCode.trim()})` : ''
      }`,
      delivery_memo: deliveryMemo.trim(),
      payment_method: paymentMethod,
      payment_provider: product.payment_provider || '3rd-Party Payment Form',
      order_status: status,
      referrer_platform: refPlatform,
      lang_mode: lang,
      created_at: new Date().toISOString(),
    };

    try {
      await onSubmitOrder(newOrder);
      setCompletedOrder(newOrder);
      setIsThirdPartyModalOpen(false);
      setIsOrderSheetOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (completedOrder) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-white">
        <div className="max-w-md w-full bg-white rounded-3xl border border-zinc-100 p-8 shadow-[0_20px_50px_rgb(0,0,0,0.05)] text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-zinc-900 text-white flex items-center justify-center mx-auto shadow-xl">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div>
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
              {isEn ? `Order #${completedOrder.order_number}` : `주문번호 ${completedOrder.order_number}`}
            </span>
            <h1 className="text-2xl font-black text-zinc-900 mt-2 tracking-tight">
              {isEn ? 'Thank you.' : '주문이 완료되었습니다.'}
            </h1>
            <p className="text-sm text-zinc-500 mt-2">
              {isEn
                ? "We've received your order and will begin processing it right away."
                : '고객님의 소중한 주문이 성공적으로 접수되었습니다.'}
            </p>
          </div>

          <div className="bg-zinc-50 rounded-2xl p-5 text-left text-sm space-y-3">
            <div className="flex justify-between border-b border-zinc-200/60 pb-3">
              <span className="text-zinc-500">{isEn ? 'Total Paid' : '총 결제 금액'}</span>
              <span className="font-black text-zinc-900">
                {formatMoney(completedOrder.total_price, completedOrder.total_price_usd)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">{isEn ? 'Product' : '상품명'}</span>
              <span className="font-medium text-zinc-900 text-right max-w-[200px] truncate">
                {completedOrder.product_name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">{isEn ? 'Shipping' : '배송지'}</span>
              <span className="font-medium text-zinc-900 text-right max-w-[210px] truncate">
                {completedOrder.shipping_address}
              </span>
            </div>
          </div>

          {completedOrder.payment_method === 'bank_transfer' && (
            <div className="p-4 rounded-2xl bg-zinc-100 text-left text-sm space-y-1">
              <p className="font-bold text-zinc-900">
                {isEn ? 'Bank Transfer Details' : '입금 계좌 안내'}
              </p>
              <p className="text-zinc-600">{bankAccountInfo}</p>
            </div>
          )}

          <div className="pt-4 flex flex-col gap-3">
            {activeThirdPartyUrl && completedOrder.payment_method !== 'bank_transfer' && (
              <a
                href={activeThirdPartyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-900 text-sm font-bold transition-colors text-center"
              >
                {isEn ? 'View Receipt / Payment Gateway' : '결제 영수증 확인'}
              </a>
            )}
            <button
              onClick={onBackToStore}
              className="w-full py-4 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-bold transition-colors shadow-lg"
            >
              {isEn ? 'Continue Shopping' : '쇼핑 계속하기'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-32">
      {/* 초미니멀 상단 네비게이션 */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-zinc-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          <button
            onClick={onBackToStore}
            className="inline-flex items-center gap-2 text-sm font-bold text-zinc-900 hover:opacity-70 transition-opacity"
          >
            <ChevronLeft className="w-5 h-5" />
            {isEn ? 'Back' : '뒤로'}
          </button>
          
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hidden sm:block">
              {isEn ? 'Official Direct Store' : '공식 독립 판매'}
            </span>
            <button
              onClick={onToggleLang}
              className="text-xs font-bold text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              {isEn ? 'KRW' : 'USD'}
            </button>
            <button
              onClick={() => handleCopyDirectUrl(lang)}
              className="p-2 bg-zinc-100 hover:bg-zinc-200 rounded-full text-zinc-900 transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 데스크탑 2단, 모바일 1단 최적화 레이아웃 */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* 좌측: 고정된 대형 이미지 갤러리 */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <div className="lg:sticky lg:top-24 space-y-4">
              <div className="relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] bg-zinc-100 rounded-[2rem] overflow-hidden">
                <img
                  src={activeImage}
                  alt={displayTitle}
                  className="w-full h-full object-cover transition-opacity duration-500"
                />
                {displayBadge && (
                  <div className="absolute top-6 left-6">
                    <span className="bg-zinc-900 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                      {displayBadge}
                    </span>
                  </div>
                )}
              </div>
              
              {gallery.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2">
                  {gallery.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(imgUrl)}
                      className={`w-20 h-20 shrink-0 rounded-2xl overflow-hidden transition-all ${
                        activeImage === imgUrl
                          ? 'border-2 border-zinc-900 opacity-100 scale-105'
                          : 'border border-zinc-200 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} className="w-full h-full object-cover" alt="" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 우측: 스크롤되는 상품 정보 */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="space-y-6 pb-10 border-b border-zinc-100">
              {post?.video_number && (
                <span className="inline-block text-[11px] font-bold text-zinc-500 tracking-widest uppercase">
                  Item #{post.video_number}
                </span>
              )}
              <h1 className="text-3xl sm:text-5xl font-black text-zinc-900 tracking-tighter leading-[1.1]">
                {displayTitle}
              </h1>
              <div className="flex items-end gap-3">
                <span className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight">
                  {formatMoney(unitPriceKrw, unitPriceUsd)}
                </span>
              </div>
              {displayDesc && (
                <p className="text-base text-zinc-600 leading-relaxed">
                  {displayDesc}
                </p>
              )}

              {/* 신뢰 요소 미니멀 렌더링 */}
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2 text-sm text-zinc-600 font-medium">
                  <ShieldCheck className="w-4 h-4 text-zinc-900" />
                  {isEn ? '100% Authentic' : '정품 인증'}
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-600 font-medium">
                  <Truck className="w-4 h-4 text-zinc-900" />
                  {isEn ? 'Global Shipping' : '해외 배송 지원'}
                </div>
              </div>
            </div>

            {/* 깔끔한 옵션 선택 영역 */}
            <div className="py-10 space-y-6 border-b border-zinc-100">
              <div>
                <label className="block text-sm font-bold text-zinc-900 mb-3">
                  {isEn ? 'Variant' : '옵션 선택'}
                </label>
                <div className="relative">
                  <select
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="w-full appearance-none px-5 py-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-sm font-bold text-zinc-900 focus:outline-none focus:border-zinc-900 transition-colors cursor-pointer"
                  >
                    {localizedOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                    <ChevronLeft className="w-4 h-4 -rotate-90" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-zinc-900 mb-3">
                  {isEn ? 'Quantity' : '수량'}
                </label>
                <div className="inline-flex items-center bg-zinc-50 border border-zinc-200 rounded-2xl p-1.5">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-3 hover:bg-white rounded-xl transition-colors text-zinc-900"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center text-sm font-bold text-zinc-900">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-3 hover:bg-white rounded-xl transition-colors text-zinc-900"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* 데스크탑에서만 보이는 구매 버튼 (모바일은 플로팅 바) */}
              <div className="hidden lg:block pt-6">
                <button
                  onClick={() => setIsOrderSheetOpen(true)}
                  className="w-full py-5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white text-base font-bold transition-all shadow-[0_10px_30px_rgb(0,0,0,0.15)] flex items-center justify-center gap-2 hover:scale-[1.02]"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {isEn ? 'Checkout' : '바로 구매하기'}
                </button>
              </div>
            </div>

            {/* AI 요약 및 상세 에디토리얼 */}
            <div className="py-10 space-y-12">
              {displaySummary && (
                <div className="p-6 rounded-[2rem] bg-zinc-50 space-y-3">
                  <p className="text-xs font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-zinc-900" />
                    {isEn ? 'Editor’s Note' : '에디터 요약'}
                  </p>
                  <p className="text-sm text-zinc-700 whitespace-pre-line leading-loose">
                    {displaySummary}
                  </p>
                </div>
              )}

              {Array.isArray(product.detail_blocks) && product.detail_blocks.length > 0 && (
                <div className="space-y-12">
                  {product.detail_blocks.map((blk, idx) => (
                    <div key={blk.id || idx} className="space-y-6">
                      {blk.image && (
                        <img
                          src={blk.image}
                          alt=""
                          className="w-full rounded-3xl object-cover"
                        />
                      )}
                      <div className="max-w-md space-y-3">
                        {(blk.title || blk.title_en) && (
                          <h3 className="text-xl font-bold text-zinc-900 tracking-tight">
                            {isEn ? blk.title_en || blk.title : blk.title}
                          </h3>
                        )}
                        {(blk.content || blk.content_en) && (
                          <p className="text-sm text-zinc-500 leading-loose whitespace-pre-line">
                            {isEn ? blk.content_en || blk.content : blk.content}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {Array.isArray(product.specs) && product.specs.length > 0 && (
                <div className="space-y-6">
                  <h2 className="text-lg font-bold text-zinc-900">
                    {isEn ? 'Specifications' : '상세 스펙'}
                  </h2>
                  <div className="divide-y divide-zinc-100 border-y border-zinc-100">
                    {product.specs.map((sp, idx) => (
                      <div key={idx} className="flex py-4">
                        <span className="w-1/3 text-sm font-medium text-zinc-400">{sp.label}</span>
                        <span className="w-2/3 text-sm font-medium text-zinc-900">{sp.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 모바일 전용 프리미엄 플로팅 액션 바 (Pill Shape) */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-md bg-zinc-900/95 backdrop-blur-xl p-2 rounded-[2.5rem] flex items-center justify-between shadow-[0_20px_40px_rgba(0,0,0,0.2)] z-40 border border-white/10">
        <div className="pl-6 py-2 flex flex-col justify-center">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
            {isEn ? 'Total' : '결제 금액'}
          </span>
          <span className="text-lg font-black text-white leading-none mt-1">
            {formatMoney(totalKrw, totalUsd)}
          </span>
        </div>
        <button
          onClick={() => setIsOrderSheetOpen(true)}
          className="h-14 px-8 rounded-full bg-white text-zinc-900 text-sm font-black transition-transform active:scale-95 flex items-center gap-2"
        >
          {isEn ? 'Checkout' : '결제하기'}
        </button>
      </div>

      {/* 주문 모달 (기존 구조 유지하되 스타일만 미니멀하게 다듬음) */}
      {isOrderSheetOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-lg rounded-t-[2rem] sm:rounded-[2rem] max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-6">
              <h3 className="text-xl font-black text-zinc-900 tracking-tight">
                {isEn ? 'Checkout' : '주문 및 결제'}
              </h3>
              <button
                onClick={() => setIsOrderSheetOpen(false)}
                className="p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleOrderFormSubmit} className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-zinc-900">{isEn ? 'Order Details' : '주문 내역'}</h4>
                <div className="p-4 rounded-2xl bg-zinc-50 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">{displayTitle}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-zinc-900">{selectedOption} × {quantity}</span>
                    <span className="text-zinc-900">{formatMoney(unitPriceKrw * quantity, unitPriceUsd * quantity)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-zinc-900">
                    {isEn ? 'Shipping Information' : '배송지 정보'}
                  </h4>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder={isEn ? 'Full Name *' : '이름 *'}
                    className="px-4 py-3.5 rounded-xl bg-zinc-50 border-none text-sm placeholder:text-zinc-400 focus:ring-2 focus:ring-zinc-900 transition-shadow"
                  />
                  <input
                    type="tel"
                    required
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    placeholder={isEn ? 'Phone *' : '연락처 *'}
                    className="px-4 py-3.5 rounded-xl bg-zinc-50 border-none text-sm placeholder:text-zinc-400 focus:ring-2 focus:ring-zinc-900 transition-shadow"
                  />
                </div>
                <select
                  value={buyerCountry}
                  onChange={(e) => setBuyerCountry(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl bg-zinc-50 border-none text-sm font-medium text-zinc-900 focus:ring-2 focus:ring-zinc-900 cursor-pointer"
                >
                  <option value="대한민국 (South Korea)">대한민국 (South Korea)</option>
                  <option value="United States">United States (USA)</option>
                  <option value="Japan">Japan (日本)</option>
                  <option value="Other International">Other Country (Global)</option>
                </select>
                <input
                  type="text"
                  required
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder={isEn ? 'Address *' : '상세 주소 *'}
                  className="w-full px-4 py-3.5 rounded-xl bg-zinc-50 border-none text-sm placeholder:text-zinc-400 focus:ring-2 focus:ring-zinc-900"
                />
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold text-zinc-900">
                  {isEn ? 'Payment Method' : '결제 수단'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('third_party_form')}
                    className={`py-3.5 px-4 rounded-xl text-xs font-bold border transition-all ${
                      paymentMethod === 'third_party_form'
                        ? 'border-zinc-900 bg-zinc-900 text-white'
                        : 'border-zinc-200 bg-white text-zinc-600'
                    }`}
                  >
                    {isEn ? 'Credit Card' : '온라인 결제'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('global_card')}
                    className={`py-3.5 px-4 rounded-xl text-xs font-bold border transition-all ${
                      paymentMethod === 'global_card'
                        ? 'border-zinc-900 bg-zinc-900 text-white'
                        : 'border-zinc-200 bg-white text-zinc-600'
                    }`}
                  >
                    PayPal
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank_transfer')}
                    className={`py-3.5 px-4 rounded-xl text-xs font-bold border transition-all ${
                      paymentMethod === 'bank_transfer'
                        ? 'border-zinc-900 bg-zinc-900 text-white'
                        : 'border-zinc-200 bg-white text-zinc-600'
                    }`}
                  >
                    {isEn ? 'Wire Transfer' : '무통장 입금'}
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t border-zinc-100 flex justify-between items-center">
                <div>
                  <span className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">{isEn ? 'Total' : '최종 결제 금액'}</span>
                  <span className="text-2xl font-black text-zinc-900 tracking-tight">{formatMoney(totalKrw, totalUsd)}</span>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-4 rounded-full bg-zinc-900 text-white text-sm font-bold shadow-lg disabled:opacity-50 transition-opacity"
                >
                  {isSubmitting ? '...' : (isEn ? 'Pay Now' : '결제 진행하기')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 결제 브릿지 모달 */}
      {isThirdPartyModalOpen && (
        <div className="fixed inset-0 z-50 bg-zinc-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] max-w-sm w-full p-8 text-center space-y-6 shadow-2xl">
             <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto">
               <Lock className="w-6 h-6 text-zinc-900" />
             </div>
             <div>
               <h3 className="text-lg font-black tracking-tight text-zinc-900 mb-2">
                 {isEn ? 'Secure Checkout' : '안전 결제 이동'}
               </h3>
               <p className="text-sm text-zinc-500">
                 {isEn ? 'You will be redirected to the secure payment gateway.' : '공식 결제 대행사 페이지로 이동합니다.'}
               </p>
             </div>
             
             {activeThirdPartyUrl && (
                <a
                  href={activeThirdPartyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 rounded-full bg-zinc-900 text-white text-sm font-bold shadow-lg"
                >
                  {isEn ? 'Continue to Payment' : '결제창 열기'}
                </a>
             )}

             <div className="pt-4 border-t border-zinc-100">
               <button
                  onClick={() => finalizeOrderSubmission('paid')}
                  className="text-xs font-bold text-zinc-400 hover:text-zinc-900 underline underline-offset-4 transition-colors"
                >
                  {isEn ? 'I have completed the payment' : '결제를 완료했습니다'}
                </button>
             </div>
             
             <button onClick={() => setIsThirdPartyModalOpen(false)} className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-900">
               <X className="w-5 h-5"/>
             </button>
          </div>
        </div>
      )}
    </div>
  );
}

// --- AdminDashboard ---
function AdminDashboard({
  products,
  orders,
  lang = 'ko',
  dbConnected,
  isSyncingDb,
  sbUrl,
  sbKey,
  setSbUrl,
  setSbKey,
  adminPin,
  bankAccountInfo,
  thirdPartyDefaultUrl,
  onSaveBankAccount,
  onSaveThirdPartyDefaultUrl,
  onConnectSupabase,
  onSyncSupabase,
  onChangePin,
  onOpenNewProduct,
  onOpenDirectShop,
  onEditProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
  onLockAdmin,
}) {
  const [newPinInput, setNewPinInput] = useState('');
  const [bankInput, setBankInput] = useState(bankAccountInfo || '');
  const [paymentUrlInput, setPaymentUrlInput] = useState(thirdPartyDefaultUrl || '');
  const [adminSubTab, setAdminSubTab] = useState('orders');

  const totalClicks = products.reduce((sum, item) => sum + (item.click_count || 0), 0);
  const totalSalesAmount = orders.reduce(
    (sum, o) => sum + (Number(o.total_price) || 0),
    0
  );

  return (
    <main className="max-w-5xl mx-auto px-4 pt-8 pb-20 space-y-8">
      <div className="bg-zinc-900 text-white rounded-3xl p-8 flex flex-col md:flex-row md:items-end justify-between gap-6 shadow-xl">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-[11px] font-bold tracking-widest uppercase mb-4">
            <ShieldCheck className="w-3.5 h-3.5" /> Workspace
          </div>
          <h1 className="text-3xl font-black tracking-tight leading-tight">
            Store Management
          </h1>
          <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
            Manage your standalone products, orders, and payment gateways seamlessly.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={onOpenNewProduct}
            className="px-5 py-3 rounded-full bg-white text-zinc-900 text-sm font-bold shadow hover:scale-105 transition-transform"
          >
            + New Product
          </button>
          <button
            onClick={onLockAdmin}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <Lock className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 미니멀 통계 카드 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Orders', value: orders.length, icon: ShoppingBag },
          { label: 'Active Products', value: products.length, icon: Package },
          { label: 'Total Views', value: totalClicks.toLocaleString(), icon: MousePointerClick },
          { label: 'Revenue (KRW)', value: `₩${totalSalesAmount.toLocaleString()}`, icon: Database },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm flex flex-col justify-between aspect-[4/3]">
            <stat.icon className="w-5 h-5 text-zinc-400" />
            <div>
              <p className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight mt-4">{stat.value}</p>
              <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mt-1">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 깔끔한 탭 */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar border-b border-zinc-200 pb-px">
        {[
          { id: 'orders', label: `Orders (${orders.length})` },
          { id: 'products', label: `Products (${products.length})` },
          { id: 'settings', label: 'Settings' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setAdminSubTab(tab.id)}
            className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
              adminSubTab === tab.id
                ? 'border-zinc-900 text-zinc-900'
                : 'border-transparent text-zinc-400 hover:text-zinc-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 탭 내용들 (스타일 정리) */}
      <div className="pt-4">
        {adminSubTab === 'orders' && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="py-20 text-center text-sm font-medium text-zinc-400 bg-white rounded-3xl border border-zinc-100">
                No orders yet.
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.id || order.order_number} className="p-6 bg-white rounded-3xl border border-zinc-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-widest bg-zinc-100 text-zinc-900 px-2 py-1 rounded">
                        {order.order_number}
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                        {order.payment_method}
                      </span>
                    </div>
                    <p className="text-base font-bold text-zinc-900">
                      {order.product_name}
                    </p>
                    <p className="text-sm text-zinc-500">
                      {order.buyer_name} • {order.shipping_address}
                    </p>
                  </div>
                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-4 border-t md:border-t-0 pt-4 md:pt-0 border-zinc-100">
                     <span className="text-lg font-black text-zinc-900">
                        {order.currency === 'USD' ? `$${Number(order.total_price_usd).toLocaleString()}` : `₩${Number(order.total_price).toLocaleString()}`}
                     </span>
                     <select
                        value={order.order_status || 'pending_payment'}
                        onChange={(e) => onUpdateOrderStatus(order, e.target.value)}
                        className="px-4 py-2 rounded-full bg-zinc-50 border border-zinc-200 text-xs font-bold text-zinc-900 cursor-pointer focus:outline-none"
                      >
                        <option value="pending_payment">Pending</option>
                        <option value="paid">Paid (Ready)</option>
                        <option value="shipped">Shipped</option>
                      </select>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {adminSubTab === 'products' && (
          <div className="grid grid-cols-1 gap-4">
            {products.map((item) => (
              <div key={item.id} className="p-4 bg-white rounded-3xl border border-zinc-100 shadow-sm flex items-center gap-4">
                 <img src={item.image_url} alt="" className="w-16 h-16 rounded-2xl object-cover bg-zinc-50 shrink-0"/>
                 <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-zinc-900 truncate">{item.name}</p>
                    <p className="text-xs text-zinc-500 truncate mt-0.5">#{item.shortform_posts?.video_number} • Views: {item.click_count || 0}</p>
                 </div>
                 <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => onOpenDirectShop(item)} className="p-2.5 text-zinc-400 hover:text-zinc-900 transition-colors bg-zinc-50 rounded-full"><ExternalLink className="w-4 h-4"/></button>
                    <button onClick={() => onEditProduct(item)} className="p-2.5 text-zinc-400 hover:text-zinc-900 transition-colors bg-zinc-50 rounded-full"><Edit3 className="w-4 h-4"/></button>
                    <button onClick={() => onDeleteProduct(item)} className="p-2.5 text-zinc-400 hover:text-red-600 transition-colors bg-zinc-50 rounded-full"><Trash2 className="w-4 h-4"/></button>
                 </div>
              </div>
            ))}
          </div>
        )}

        {adminSubTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 설정 폼들 스타일 미니멀하게 정리 */}
            <form onSubmit={(e) => { e.preventDefault(); onSaveThirdPartyDefaultUrl(paymentUrlInput); }} className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm space-y-4">
               <h3 className="text-sm font-bold text-zinc-900">Default Payment URL</h3>
               <input type="url" value={paymentUrlInput} onChange={(e) => setPaymentUrlInput(e.target.value)} className="w-full p-4 rounded-xl bg-zinc-50 border-none text-sm focus:ring-2 focus:ring-zinc-900"/>
               <button type="submit" className="px-6 py-3 rounded-full bg-zinc-900 text-white text-sm font-bold">Save</button>
            </form>
            <form onSubmit={(e) => { e.preventDefault(); onSaveBankAccount(bankInput); }} className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm space-y-4">
               <h3 className="text-sm font-bold text-zinc-900">Bank Transfer Info</h3>
               <input type="text" value={bankInput} onChange={(e) => setBankInput(e.target.value)} className="w-full p-4 rounded-xl bg-zinc-50 border-none text-sm focus:ring-2 focus:ring-zinc-900"/>
               <button type="submit" className="px-6 py-3 rounded-full bg-zinc-900 text-white text-sm font-bold">Save</button>
            </form>
            <form onSubmit={onConnectSupabase} className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm space-y-4">
               <h3 className="text-sm font-bold text-zinc-900 flex justify-between">Supabase DB <span className={dbConnected ? "text-emerald-500" : "text-zinc-400"}>●</span></h3>
               <input type="url" value={sbUrl} onChange={(e) => setSbUrl(e.target.value)} placeholder="URL" className="w-full p-4 rounded-xl bg-zinc-50 border-none text-sm focus:ring-2 focus:ring-zinc-900"/>
               <input type="password" value={sbKey} onChange={(e) => setSbKey(e.target.value)} placeholder="Key" className="w-full p-4 rounded-xl bg-zinc-50 border-none text-sm focus:ring-2 focus:ring-zinc-900"/>
               <button type="submit" className="px-6 py-3 rounded-full bg-zinc-900 text-white text-sm font-bold">Connect</button>
            </form>
            <form onSubmit={(e) => { e.preventDefault(); onChangePin(newPinInput); setNewPinInput(''); }} className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm space-y-4">
               <h3 className="text-sm font-bold text-zinc-900">Change Admin PIN</h3>
               <input type="password" value={newPinInput} onChange={(e) => setNewPinInput(e.target.value)} placeholder="New PIN" className="w-full p-4 rounded-xl bg-zinc-50 border-none text-sm focus:ring-2 focus:ring-zinc-900"/>
               <button type="submit" className="px-6 py-3 rounded-full bg-zinc-900 text-white text-sm font-bold">Update</button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}

// --- ProductFormModal ---
function ProductFormModal({
  editingItem,
  defaultVideoNumber,
  lang = 'ko',
  onClose,
  onSave,
  onShowToast,
}) {
  const [sourceType, setSourceType] = useState(editingItem?.source_type || 'manual');

  const [videoNumber, setVideoNumber] = useState(
    editingItem
      ? String(editingItem.shortform_posts?.video_number || '')
      : defaultVideoNumber
  );
  const [platform, setPlatform] = useState(
    editingItem?.shortform_posts?.platform || 'instagram'
  );
  const [videoUrl, setVideoUrl] = useState(
    editingItem?.shortform_posts?.video_url || ''
  );
  const [videoTitle, setVideoTitle] = useState(
    editingItem?.shortform_posts?.title || ''
  );
  const [videoTitleEn, setVideoTitleEn] = useState(
    editingItem?.shortform_posts?.title_en || ''
  );

  const [saleType, setSaleType] = useState(editingItem?.sale_type || 'direct');
  const [purchaseUrl, setPurchaseUrl] = useState(editingItem?.purchase_url || '');

  const [paymentProvider, setPaymentProvider] = useState(
    editingItem?.payment_provider || 'Stripe / PayPal / Toss'
  );
  const [thirdPartyPaymentUrl, setThirdPartyPaymentUrl] = useState(
    editingItem?.third_party_payment_url || ''
  );
  const [thirdPartyPaymentUrlEn, setThirdPartyPaymentUrlEn] = useState(
    editingItem?.third_party_payment_url_en || ''
  );

  const [productName, setProductName] = useState(editingItem?.name || '');
  const [productNameEn, setProductNameEn] = useState(editingItem?.name_en || '');
  const [price, setPrice] = useState(
    editingItem?.price ? String(editingItem.price) : ''
  );
  const [priceUsd, setPriceUsd] = useState(
    editingItem?.price_usd ? String(editingItem.price_usd) : ''
  );
  const [optionsInput, setOptionsInput] = useState(
    Array.isArray(editingItem?.options) ? editingItem.options.join(', ') : ''
  );
  const [optionsEnInput, setOptionsEnInput] = useState(
    Array.isArray(editingItem?.options_en) ? editingItem.options_en.join(', ') : ''
  );

  const [imageUrl, setImageUrl] = useState(editingItem?.image_url || '');
  const [galleryImages, setGalleryImages] = useState(
    Array.isArray(editingItem?.gallery_images) && editingItem.gallery_images.length > 0
      ? editingItem.gallery_images
      : editingItem?.image_url
      ? [editingItem.image_url]
      : []
  );

  const [badgeText, setBadgeText] = useState(editingItem?.badge_text || '');
  const [badgeTextEn, setBadgeTextEn] = useState(editingItem?.badge_text_en || '');
  const [description, setDescription] = useState(editingItem?.description || '');
  const [descriptionEn, setDescriptionEn] = useState(editingItem?.description_en || '');
  const [aiSummary, setAiSummary] = useState(
    editingItem?.shortform_posts?.ai_summary || ''
  );
  const [aiSummaryEn, setAiSummaryEn] = useState(
    editingItem?.shortform_posts?.ai_summary_en || ''
  );
  const [tagsInput, setTagsInput] = useState(
    Array.isArray(editingItem?.shortform_posts?.tags)
      ? editingItem.shortform_posts.tags.join(', ')
      : ''
  );

  const [detailBlocks, setDetailBlocks] = useState(
    Array.isArray(editingItem?.detail_blocks) && editingItem.detail_blocks.length > 0
      ? editingItem.detail_blocks
      : [
          {
            id: `blk-${Date.now()}`,
            title: '',
            title_en: '',
            content: '',
            content_en: '',
            image: '',
          },
        ]
  );

  const [specs, setSpecs] = useState(
    Array.isArray(editingItem?.specs) && editingItem.specs.length > 0
      ? editingItem.specs
      : [
          { label: '소재 / 재질 (Material)', value: '' },
          { label: '크기 / 중량 (Size & Weight)', value: '' },
        ]
  );

  const [isScraping, setIsScraping] = useState(false);
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  const handleScrapeUrl = async () => {
    if (!purchaseUrl.trim().startsWith('http')) {
      onShowToast('⚠️ 올바른 웹페이지 주소(https://...)를 먼저 입력해 주세요.');
      return;
    }
    setIsScraping(true);
    try {
      let extracted = null;
      const res = await fetch(
        `https://api.microlink.io/?url=${encodeURIComponent(purchaseUrl)}`
      );
      const json = await res.json();
      if (json.status === 'success' && json.data) {
        extracted = {
          title: json.data.title || '',
          image: json.data.image?.url || '',
          description: json.data.description || '',
          price: '',
        };
      }

      if (extracted) {
        if (extracted.title) setProductName(extracted.title);
        if (extracted.image) {
          setImageUrl(extracted.image);
          setGalleryImages((prev) =>
            prev.includes(extracted.image) ? prev : [extracted.image, ...prev]
          );
        }
        if (extracted.description) setDescription(extracted.description);
        if (extracted.price) {
          setPrice(extracted.price);
          setPriceUsd(
            String(Math.max(1, Math.round(Number(extracted.price) / 1380)))
          );
        }
        onShowToast('🔗 웹페이지에서 상품명·이미지·설명을 자동으로 가져왔습니다!');
      } else {
        throw new Error();
      }
    } catch {
      onShowToast(
        'ℹ️ 보안 정책으로 자동 추출이 제한된 사이트입니다. 직접 사진·내용 업로드 탭을 이용해 주세요.'
      );
    } finally {
      setIsScraping(false);
    }
  };

  // 고화질 사진을 브라우저 저장소 용량 초과 없이 영구 보존하기 위한 자동 리사이징·압축 헬퍼
  const compressImageFile = (file, maxWidth = 1000, quality = 0.8) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let { width, height } = img;
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.onerror = () => resolve(ev.target.result);
        img.src = ev.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  // 로컬 이미지 파일 선택 (자동 최적화 후 대표 + 갤러리 추가)
  const handleMainImageUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const compressedList = await Promise.all(
      files.map((file) => compressImageFile(file, 1000, 0.8))
    );

    if (compressedList[0]) {
      setImageUrl(compressedList[0]);
    }
    setGalleryImages((prev) => [...prev, ...compressedList]);
    onShowToast(`📸 ${files.length}장의 사진이 용량 최적화되어 갤러리에 추가되었습니다!`);
  };

  // 상세 블록 이미지 업로드 (자동 최적화)
  const handleBlockImageUpload = async (idx, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const optimizedUrl = await compressImageFile(file, 960, 0.78);
    setDetailBlocks((prev) =>
      prev.map((blk, i) => (i === idx ? { ...blk, image: optimizedUrl } : blk))
    );
    onShowToast('📸 상세 설명 섹션 사진이 등록되었습니다.');
  };

  // 원화 입력 시 달러(USD) 자동 환산 보조
  const handlePriceChange = (val) => {
    setPrice(val);
    const num = Number(val);
    if (num > 0 && !priceUsd) {
      setPriceUsd(String(Math.max(1, Math.round(num / 1380))));
    }
  };

  // AI 한·영 마케팅 문구 및 글로벌 영문 번역 자동 완성
  const handleAiAutoFillAndTranslate = () => {
    if (!productName.trim()) {
      onShowToast('⚠️ 먼저 한국어 상품명을 입력해 주세요.');
      return;
    }
    setIsAiGenerating(true);
    setTimeout(() => {
      const pLabel =
        platform === 'instagram' ? '릴스' : platform === 'tiktok' ? '틱톡' : '쇼츠';
      const pLabelEn =
        platform === 'instagram' ? 'Reels' : platform === 'tiktok' ? 'TikTok' : 'Shorts';

      if (!videoTitle.trim()) {
        setVideoTitle(
          `요즘 ${pLabel}에서 문의 폭주한 '${productName.slice(0, 18)}' 실사용 리뷰`
        );
      }
      if (!badgeText.trim()) {
        setBadgeText(saleType === 'direct' ? '공식 독립스토어 특가' : `${pLabel} 화제템`);
      }
      if (!badgeTextEn.trim()) {
        setBadgeTextEn(
          saleType === 'direct' ? 'Official Direct Deal' : `${pLabelEn} Trending`
        );
      }
      if (!productNameEn.trim()) {
        setProductNameEn(`${productName} (Global Edition)`);
      }
      if (!videoTitleEn.trim()) {
        setVideoTitleEn(
          `Viral ${pLabelEn} Pick: ${productNameEn || productName} Hands-On Review`
        );
      }
      if (!description.trim()) {
        setDescription(
          `${productName}만의 뛰어난 품질과 실용성을 직접 확인하세요. 국내외 어디서나 간편하게 온라인 결제 폼으로 주문 가능합니다.`
        );
      }
      if (!descriptionEn.trim()) {
        setDescriptionEn(
          `Experience premium quality and practical design with ${
            productNameEn || productName
          }. Available for instant worldwide order via our secure 3rd-party online payment form.`
        );
      }
      if (!priceUsd && Number(price) > 0) {
        setPriceUsd(String(Math.max(1, Math.round(Number(price) / 1380))));
      }
      if (optionsInput.trim() && !optionsEnInput.trim()) {
        const opts = optionsInput
          .split(',')
          .map((o, i) => `Option ${i + 1} (${o.trim()})`)
          .join(', ');
        setOptionsEnInput(opts);
      }

      setAiSummary(
        `• 홈페이지 없이도 실물 촬영 사진과 상세 스펙을 한눈에 볼 수 있는 공식 판매 페이지\n• 검증된 제3자 온라인 결제 폼 연동으로 카드·간편결제·해외결제 모두 안전 지원\n• 한국어/영문(EN) 실시간 전환으로 해외 구매자도 즉시 주문 가능`
      );
      setAiSummaryEn(
        `• Official standalone product page with authentic photos and full specifications\n• Instant & secure checkout powered by trusted 3rd-party online payment form\n• Full English/Korean support with worldwide international shipping`
      );

      if (!tagsInput.trim()) {
        setTagsInput(`${pLabel}추천템, 글로벌배송, 산지직송, 공식스토어`);
      }

      setIsAiGenerating(false);
      onShowToast(
        '✨ AI 한국어·영문(EN) 상품 설명 및 글로벌 페이지 문구가 자동 완성되었습니다!'
      );
    }, 400);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!videoNumber.trim() || !productName.trim()) {
      onShowToast('⚠️ 영상 번호와 상품명은 필수 입력 항목입니다.');
      return;
    }

    const parsedOptions = optionsInput
      .split(',')
      .map((o) => o.trim())
      .filter(Boolean);
    const parsedOptionsEn = optionsEnInput
      .split(',')
      .map((o) => o.trim())
      .filter(Boolean);
    const parsedTags = tagsInput
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    const cleanedBlocks = detailBlocks.filter(
      (b) => b.title.trim() || b.content.trim() || b.image.trim()
    );
    const cleanedSpecs = specs.filter((s) => s.label.trim() && s.value.trim());
    const primaryImage =
      imageUrl.trim() ||
      galleryImages[0] ||
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&q=80';
    const finalGallery =
      galleryImages.length > 0 ? galleryImages : [primaryImage];

    onSave({
      sourceType,
      videoNumber: Number(videoNumber),
      platform,
      videoUrl: videoUrl.trim(),
      videoTitle: videoTitle.trim() || `${productName.trim()} 공식 판매 페이지`,
      videoTitleEn:
        videoTitleEn.trim() ||
        `${productNameEn.trim() || productName.trim()} Official Store`,
      saleType,
      purchaseUrl: purchaseUrl.trim(),
      paymentProvider: paymentProvider.trim() || 'Online Payment Form',
      thirdPartyPaymentUrl: thirdPartyPaymentUrl.trim(),
      thirdPartyPaymentUrlEn:
        thirdPartyPaymentUrlEn.trim() || thirdPartyPaymentUrl.trim(),
      name: productName.trim(),
      nameEn: productNameEn.trim() || productName.trim(),
      price: Number(price) || 0,
      priceUsd:
        Number(priceUsd) ||
        (Number(price) > 0 ? Math.max(1, Math.round(Number(price) / 1380)) : 0),
      options: parsedOptions,
      optionsEn: parsedOptionsEn.length > 0 ? parsedOptionsEn : parsedOptions,
      imageUrl: primaryImage,
      galleryImages: finalGallery,
      detailBlocks: cleanedBlocks,
      specs: cleanedSpecs,
      badgeText: badgeText.trim(),
      badgeTextEn: badgeTextEn.trim() || badgeText.trim(),
      description: description.trim(),
      descriptionEn: descriptionEn.trim() || description.trim(),
      aiSummary: aiSummary.trim(),
      aiSummaryEn: aiSummaryEn.trim() || aiSummary.trim(),
      tags: parsedTags,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-zinc-900/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-[2rem] max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 shadow-2xl my-auto no-scrollbar">
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-zinc-100">
          <div>
            <h2 className="text-2xl font-black text-zinc-900 tracking-tight">
              {editingItem ? 'Edit Product' : 'Add New Product'}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 미니멀하게 정리된 폼 섹션들 */}
          {/* STEP 1: Source */}
          <div className="space-y-4">
             <label className="text-sm font-bold text-zinc-900">1. Data Source</label>
             <div className="flex bg-zinc-50 p-1.5 rounded-2xl w-fit">
               {['manual', 'homepage', 'platform'].map(type => (
                 <button
                   key={type} type="button" onClick={() => setSourceType(type)}
                   className={`px-6 py-2.5 rounded-xl text-sm font-bold capitalize transition-colors ${sourceType === type ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-900'}`}
                 >
                   {type}
                 </button>
               ))}
             </div>
             {sourceType !== 'manual' && (
                <div className="flex gap-2 max-w-xl">
                  <input type="url" value={purchaseUrl} onChange={(e) => setPurchaseUrl(e.target.value)} placeholder="URL..." className="flex-1 px-4 py-3 bg-zinc-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-zinc-900"/>
                  <button type="button" onClick={handleScrapeUrl} className="px-6 rounded-xl bg-zinc-900 text-white text-sm font-bold">Fetch</button>
                </div>
             )}
          </div>

          {/* STEP 2: Media */}
          <div className="space-y-4">
             <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-zinc-900">2. Media & Gallery</label>
                <label className="cursor-pointer px-4 py-2 bg-zinc-100 hover:bg-zinc-200 rounded-full text-xs font-bold text-zinc-900 transition-colors">
                  + Upload Images
                  <input type="file" accept="image/*" multiple onChange={handleMainImageUpload} className="hidden" />
                </label>
             </div>
             <input type="text" value={imageUrl} onChange={e=>setImageUrl(e.target.value)} placeholder="Primary Image URL" className="w-full px-4 py-3 bg-zinc-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-zinc-900"/>
             {galleryImages.length > 0 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                   {galleryImages.map((img, i) => (
                      <div key={i} className="relative w-20 h-20 shrink-0">
                         <img src={img} className="w-full h-full rounded-2xl object-cover border border-zinc-200" alt=""/>
                         <button type="button" onClick={() => setGalleryImages(prev=>prev.filter((_, idx)=>idx!==i))} className="absolute -top-2 -right-2 bg-zinc-900 text-white rounded-full p-1"><X className="w-3 h-3"/></button>
                      </div>
                   ))}
                </div>
             )}
          </div>

          {/* STEP 3: Basic Info (Sleek Grid) */}
          <div className="space-y-4">
             <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-zinc-900">3. Product Details</label>
                <button type="button" onClick={handleAiAutoFillAndTranslate} className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full flex items-center gap-1"><Sparkles className="w-3 h-3"/> AI Magic</button>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" required value={productName} onChange={e=>setProductName(e.target.value)} placeholder="Name (KR)" className="px-4 py-3 bg-zinc-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-zinc-900"/>
                <input type="text" value={productNameEn} onChange={e=>setProductNameEn(e.target.value)} placeholder="Name (EN)" className="px-4 py-3 bg-zinc-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-zinc-900"/>
                <input type="number" required value={price} onChange={e=>handlePriceChange(e.target.value)} placeholder="Price (KRW)" className="px-4 py-3 bg-zinc-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-zinc-900"/>
                <input type="number" value={priceUsd} onChange={e=>setPriceUsd(e.target.value)} placeholder="Price (USD)" className="px-4 py-3 bg-zinc-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-zinc-900"/>
                <input type="text" value={optionsInput} onChange={e=>setOptionsInput(e.target.value)} placeholder="Options (KR, comma separated)" className="px-4 py-3 bg-zinc-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-zinc-900"/>
                <input type="text" value={optionsEnInput} onChange={e=>setOptionsEnInput(e.target.value)} placeholder="Options (EN, comma separated)" className="px-4 py-3 bg-zinc-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-zinc-900"/>
             </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-8 border-t border-zinc-100">
            <button type="button" onClick={onClose} className="px-6 py-3 rounded-full bg-zinc-100 text-zinc-900 text-sm font-bold hover:bg-zinc-200">Cancel</button>
            <button type="submit" className="px-8 py-3 rounded-full bg-zinc-900 text-white text-sm font-bold shadow-lg hover:bg-zinc-800 transition-colors">
               {editingItem ? 'Save Changes' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// --- App ---
const safeGetStorage = (key, fallback) => {
  try {
    const val = localStorage.getItem(key);
    return val !== null ? val : fallback;
  } catch {
    return fallback;
  }
};

const safeSetStorage = (key, val) => {
  try {
    localStorage.setItem(key, val);
    return true;
  } catch {
    return false;
  }
};

// 대용량 사진이 포함된 상품 데이터를 새로고침 후에도 영구 보존하기 위한 IndexedDB 백업 스토리지
const IDB_NAME = 'shortpick_store_db';
const IDB_STORE = 'kv_store';

function idbSave(key, value) {
  return new Promise((resolve) => {
    try {
      const req = indexedDB.open(IDB_NAME, 1);
      req.onupgradeneeded = () => {
        if (!req.result.objectStoreNames.contains(IDB_STORE)) {
          req.result.createObjectStore(IDB_STORE);
        }
      };
      req.onsuccess = () => {
        const tx = req.result.transaction(IDB_STORE, 'readwrite');
        tx.objectStore(IDB_STORE).put(value, key);
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => resolve(false);
      };
      req.onerror = () => resolve(false);
    } catch {
      resolve(false);
    }
  });
}

function idbLoad(key) {
  return new Promise((resolve) => {
    try {
      const req = indexedDB.open(IDB_NAME, 1);
      req.onupgradeneeded = () => {
        if (!req.result.objectStoreNames.contains(IDB_STORE)) {
          req.result.createObjectStore(IDB_STORE);
        }
      };
      req.onsuccess = () => {
        const tx = req.result.transaction(IDB_STORE, 'readonly');
        const getReq = tx.objectStore(IDB_STORE).get(key);
        getReq.onsuccess = () => resolve(getReq.result ?? null);
        getReq.onerror = () => resolve(null);
      };
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

export default function App() {
  const envUrl =
    (typeof window !== 'undefined' && window.__ENV__?.VITE_SUPABASE_URL) || '';
  const envKey =
    (typeof window !== 'undefined' && window.__ENV__?.VITE_SUPABASE_ANON_KEY) || '';

  const [lang, setLang] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang');
      if (urlLang === 'en' || urlLang === 'ko') return urlLang;
    } catch {
      // ignore
    }
    return safeGetStorage('sf_lang_mode', 'ko');
  });

  const [activeTab, setActiveTab] = useState('store');
  const [selectedShopProduct, setSelectedShopProduct] = useState(null);
  const [refPlatform, setRefPlatform] = useState('shortform');

  // 관리자 인증 상태 (일반 방문자는 상품 등록 불가, 관리자 PIN 잠금 해제 시에만 허용)
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPin, setAdminPin] = useState(() =>
    safeGetStorage('sf_admin_pin', '1234')
  );
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  // Supabase DB 상태
  const [sbUrl, setSbUrl] = useState(
    () => envUrl || safeGetStorage('sf_supabase_url', '')
  );
  const [sbKey, setSbKey] = useState(
    () => envKey || safeGetStorage('sf_supabase_key', '')
  );
  const [dbConnected, setDbConnected] = useState(Boolean(envUrl && envKey));
  const [isSyncingDb, setIsSyncingDb] = useState(false);

  // 상품 & 주문 데이터
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('sf_products_v3');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });
  const [isStorageHydrated, setIsStorageHydrated] = useState(false);
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('sf_direct_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [bankAccountInfo, setBankAccountInfo] = useState(() =>
    safeGetStorage(
      'sf_bank_info',
      '카카오뱅크 3333-00-0000000 (예금주: 숏픽글로벌스토어)'
    )
  );
  const [thirdPartyDefaultUrl, setThirdPartyDefaultUrl] = useState(() =>
    safeGetStorage(
      'sf_third_party_url',
      'https://buy.stripe.com/test_global_checkout'
    )
  );

  const [showProductModal, setShowProductModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingItem, setDeletingItem] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // 앱 최초 마운트 시 IndexedDB에서 대용량 이미지 포함 상품 목록 복원
  useEffect(() => {
    let mounted = true;
    (async () => {
      const idbProducts = await idbLoad('sf_products_v3');
      if (mounted && Array.isArray(idbProducts) && idbProducts.length > 0) {
        setProducts(idbProducts);
        const params = new URLSearchParams(window.location.search);
        const shopVideoNum = params.get('shop');
        if (shopVideoNum) {
          const found = idbProducts.find(
            (p) => String(p.shortform_posts?.video_number) === String(shopVideoNum)
          );
          if (found) {
            setSelectedShopProduct(found);
            setActiveTab('shop');
          }
        }
      }
      if (mounted) setIsStorageHydrated(true);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isStorageHydrated) return;
    const serialized = JSON.stringify(products);
    safeSetStorage('sf_products_v3', serialized);
    idbSave('sf_products_v3', products);
  }, [products, isStorageHydrated]);

  useEffect(() => {
    safeSetStorage('sf_direct_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    safeSetStorage('sf_lang_mode', lang);
  }, [lang]);

  // Supabase 데이터 동기화 (DB에 등록된 상품과 로컬 등록 상품을 병합하여 유실 방지)
  const syncSupabase = async (url = sbUrl, key = sbKey) => {
    if (!url || !key) return false;
    setIsSyncingDb(true);
    try {
      const [fetchedProducts, fetchedOrders] = await Promise.all([
        apiFetchProducts(url, key),
        apiFetchDirectOrders(url, key),
      ]);
      setDbConnected(true);
      if (Array.isArray(fetchedProducts) && fetchedProducts.length > 0) {
        setProducts((prev) => {
          const localOnly = prev.filter((p) => String(p.id).startsWith('local-'));
          const remoteIds = new Set(fetchedProducts.map((r) => r.id));
          return [
            ...localOnly.filter((l) => !remoteIds.has(l.id)),
            ...fetchedProducts,
          ];
        });
      }
      if (Array.isArray(fetchedOrders)) {
        setOrders(fetchedOrders);
      }
      return true;
    } catch {
      setDbConnected(false);
      return false;
    } finally {
      setIsSyncingDb(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      if (sbUrl && sbKey) {
        await syncSupabase(sbUrl, sbKey);
      }
      const params = new URLSearchParams(window.location.search);
      const shopVideoNum = params.get('shop');
      const ref = params.get('ref');
      const urlLang = params.get('lang');
      if (ref) setRefPlatform(ref);
      if (urlLang === 'en' || urlLang === 'ko') setLang(urlLang);

      if (shopVideoNum) {
        const found = products.find(
          (p) => String(p.shortform_posts?.video_number) === String(shopVideoNum)
        );
        if (found) {
          setSelectedShopProduct(found);
          setActiveTab('shop');
        }
      }
    };
    init();
  }, []);

  const handleToggleLang = () => {
    const next = lang === 'ko' ? 'en' : 'ko';
    setLang(next);
    showToast(
      next === 'en'
        ? '🌐 Switched to Global English Store (USD)'
        : '🇰🇷 한국어 스토어(KRW) 모드로 전환되었습니다.'
    );
  };

  const handleOpenDirectShop = (item) => {
    setSelectedShopProduct(item);
    setActiveTab('shop');
    const videoNum = item?.shortform_posts?.video_number;
    try {
      if (videoNum) {
        window.history.replaceState({}, '', `?shop=${videoNum}&lang=${lang}`);
      }
    } catch {
      // ignore in sandboxed environments
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToStore = () => {
    setSelectedShopProduct(null);
    setActiveTab('store');
    try {
      window.history.replaceState({}, '', window.location.pathname);
    } catch {
      // ignore
    }
  };

  const handleCopyShopLink = (item) => {
    const videoNum = item.shortform_posts?.video_number || '';
    const link = `${window.location.origin}${window.location.pathname}?shop=${videoNum}&lang=${lang}`;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(link);
    }
    showToast(
      lang === 'en'
        ? `🔗 Standalone Page Link (#${videoNum}) copied!`
        : `🔗 #${videoNum}번 상품 독립 판매페이지 링크가 복사되었습니다!`
    );
  };

  const handleSubmitOrder = async (newOrder) => {
    if (dbConnected && sbUrl && sbKey) {
      try {
        await apiCreateDirectOrder(sbUrl, sbKey, newOrder);
        await syncSupabase();
      } catch {
        setOrders((prev) => [newOrder, ...prev]);
      }
    } else {
      setOrders((prev) => [newOrder, ...prev]);
    }
    showToast(
      lang === 'en'
        ? '✅ Order & payment successfully recorded!'
        : '✅ 주문 및 결제 내역이 정상 접수되었습니다!'
    );
  };

  const handleUpdateOrderStatus = async (order, nextStatus) => {
    if (dbConnected && sbUrl && sbKey && order.id) {
      await apiUpdateOrderStatus(sbUrl, sbKey, order.id, nextStatus);
      await syncSupabase();
    } else {
      setOrders((prev) =>
        prev.map((o) =>
          o.order_number === order.order_number
            ? { ...o, order_status: nextStatus }
            : o
        )
      );
    }
    showToast('✅ 주문 처리 상태가 변경되었습니다.');
  };

  // 상품 등록 및 수정 저장 (관리자 전용 + 독립 판매 페이지 생성 + 즉시 영구 저장)
  const handleSaveProduct = async (formData) => {
    if (!isAdmin) {
      showToast('🔒 관리자만 상품을 등록하거나 수정할 수 있습니다.');
      setShowProductModal(false);
      return;
    }

    if (editingItem) {
      const updatedItem = {
        ...editingItem,
        source_type: formData.sourceType,
        sale_type: formData.saleType,
        name: formData.name,
        name_en: formData.nameEn,
        price: formData.price,
        price_usd: formData.priceUsd,
        options: formData.options,
        options_en: formData.optionsEn,
        image_url: formData.imageUrl || editingItem.image_url,
        gallery_images: formData.galleryImages,
        detail_blocks: formData.detailBlocks,
        specs: formData.specs,
        purchase_url: formData.purchaseUrl,
        payment_provider: formData.paymentProvider,
        third_party_payment_url: formData.thirdPartyPaymentUrl,
        third_party_payment_url_en: formData.thirdPartyPaymentUrlEn,
        badge_text: formData.badgeText,
        badge_text_en: formData.badgeTextEn,
        description: formData.description,
        description_en: formData.descriptionEn,
        shortform_posts: {
          ...editingItem.shortform_posts,
          video_number: formData.videoNumber,
          platform: formData.platform,
          title: formData.videoTitle,
          title_en: formData.videoTitleEn,
          video_url: formData.videoUrl,
          ai_summary: formData.aiSummary,
          ai_summary_en: formData.aiSummaryEn,
          tags: formData.tags,
        },
      };

      const updatedList = products.map((p) =>
        p.id === editingItem.id ? updatedItem : p
      );
      setProducts(updatedList);
      safeSetStorage('sf_products_v3', JSON.stringify(updatedList));
      await idbSave('sf_products_v3', updatedList);

      if (selectedShopProduct?.id === editingItem.id) {
        setSelectedShopProduct(updatedItem);
      }
      showToast('✅ 상품 및 독립 판매페이지 정보가 영구 저장되었습니다.');
    } else {
      const postId = `post-${Date.now()}`;
      const newEntry = {
        id: `local-${Date.now()}`,
        post_id: postId,
        item_code: `${formData.videoNumber}-A`,
        source_type: formData.sourceType,
        sale_type: formData.saleType,
        name: formData.name,
        name_en: formData.nameEn,
        description: formData.description,
        description_en: formData.descriptionEn,
        price: formData.price,
        price_usd: formData.priceUsd,
        options: formData.options,
        options_en: formData.optionsEn,
        image_url:
          formData.imageUrl ||
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&q=80',
        gallery_images: formData.galleryImages,
        detail_blocks: formData.detailBlocks,
        specs: formData.specs,
        purchase_url: formData.purchaseUrl,
        payment_provider: formData.paymentProvider,
        third_party_payment_url: formData.thirdPartyPaymentUrl,
        third_party_payment_url_en: formData.thirdPartyPaymentUrlEn,
        badge_text: formData.badgeText,
        badge_text_en: formData.badgeTextEn,
        click_count: 0,
        shortform_posts: {
          id: postId,
          video_number: formData.videoNumber,
          platform: formData.platform,
          title: formData.videoTitle,
          title_en: formData.videoTitleEn,
          video_url: formData.videoUrl,
          ai_summary: formData.aiSummary,
          ai_summary_en: formData.aiSummaryEn,
          tags: formData.tags,
        },
      };

      const nextProducts = [newEntry, ...products];
      setProducts(nextProducts);
      safeSetStorage('sf_products_v3', JSON.stringify(nextProducts));
      await idbSave('sf_products_v3', nextProducts);

      setSelectedShopProduct(newEntry);
      setActiveTab('shop');
      try {
        window.history.replaceState(
          {},
          '',
          `?shop=${formData.videoNumber}&lang=${lang}`
        );
      } catch {
        // ignore
      }
      showToast(
        `🎉 #${formData.videoNumber}번 상품의 독립 판매페이지(KR/EN)가 생성 및 저장되었습니다!`
      );
    }
    setShowProductModal(false);
  };

  const confirmDeleteProduct = async () => {
    if (!deletingItem || !isAdmin) return;
    const filtered = products.filter((p) => p.id !== deletingItem.id);
    setProducts(filtered);
    safeSetStorage('sf_products_v3', JSON.stringify(filtered));
    await idbSave('sf_products_v3', filtered);

    if (selectedShopProduct?.id === deletingItem.id) {
      setSelectedShopProduct(null);
      setActiveTab('store');
    }
    setDeletingItem(null);
    showToast('🗑️ 상품이 삭제되었습니다.');
  };

  const handleProductClick = (item) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === item.id ? { ...p, click_count: (p.click_count || 0) + 1 } : p
      )
    );
  };

  const nextVideoNumber = String(
    products.reduce(
      (max, p) => Math.max(max, Number(p.shortform_posts?.video_number || 0)),
      106
    ) + 1
  );

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans">
      {toastMessage && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-zinc-900 text-white text-sm font-bold px-6 py-3 rounded-full shadow-2xl tracking-wide">
          {toastMessage}
        </div>
      )}

      {/* 미니멀 GNB 헤더 (Blur & Transparent) */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-zinc-100/50 transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          <button onClick={handleBackToStore} className="flex items-center gap-2 group">
            <span className="font-black text-xl tracking-tighter group-hover:opacity-70 transition-opacity">SHORTPICK.</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleLang}
              className="px-4 py-2 rounded-full hover:bg-zinc-50 text-zinc-900 text-xs font-black uppercase tracking-wider transition-colors"
            >
              {lang === 'en' ? 'EN' : 'KR'}
            </button>

            {!isAdmin ? (
              <button
                onClick={() => { setPinInput(''); setPinError(''); setShowPinModal(true); }}
                className="p-2 text-zinc-400 hover:text-zinc-900 transition-colors"
              >
                <Lock className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-zinc-50 p-1 rounded-full border border-zinc-200/60">
                <button
                  onClick={() => setActiveTab('store')}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${activeTab === 'store' ? 'bg-white shadow-sm text-zinc-900' : 'text-zinc-500'}`}
                >
                  Store
                </button>
                <button
                  onClick={() => setActiveTab('admin')}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${activeTab === 'admin' ? 'bg-white shadow-sm text-zinc-900' : 'text-zinc-500'}`}
                >
                  Admin
                </button>
                <button
                  onClick={() => { setIsAdmin(false); setActiveTab('store'); showToast('🔒 Logged out'); }}
                  className="p-1.5 rounded-full hover:bg-zinc-200 text-zinc-500 transition-colors ml-1"
                >
                  <Unlock className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 뷰 라우팅 */}
      {activeTab === 'store' && (
        <StoreView
          products={products}
          lang={lang}
          isAdmin={isAdmin}
          onProductClick={handleProductClick}
          onOpenDirectShop={handleOpenDirectShop}
          onOpenManualCreate={() => { setEditingItem(null); setShowProductModal(true); }}
          onEditProduct={(item) => { setEditingItem(item); setShowProductModal(true); }}
          onDeleteProduct={(item) => setDeletingItem(item)}
          onCopyShopLink={handleCopyShopLink}
        />
      )}

      {activeTab === 'shop' && (
        <DirectShopView
          product={selectedShopProduct || products[0]}
          lang={lang}
          onToggleLang={handleToggleLang}
          refPlatform={refPlatform}
          bankAccountInfo={bankAccountInfo}
          thirdPartyDefaultUrl={thirdPartyDefaultUrl}
          onBackToStore={handleBackToStore}
          onSubmitOrder={handleSubmitOrder}
          onShowToast={showToast}
        />
      )}

      {activeTab === 'admin' && isAdmin && (
        <AdminDashboard
          products={products}
          orders={orders}
          lang={lang}
          dbConnected={dbConnected}
          isSyncingDb={isSyncingDb}
          sbUrl={sbUrl}
          sbKey={sbKey}
          setSbUrl={setSbUrl}
          setSbKey={setSbKey}
          adminPin={adminPin}
          bankAccountInfo={bankAccountInfo}
          thirdPartyDefaultUrl={thirdPartyDefaultUrl}
          onSaveBankAccount={(val) => { setBankAccountInfo(val); safeSetStorage('sf_bank_info', val); showToast('✅ Saved.'); }}
          onSaveThirdPartyDefaultUrl={(val) => { setThirdPartyDefaultUrl(val); safeSetStorage('sf_third_party_url', val); showToast('✅ Saved.'); }}
          onConnectSupabase={async (e) => {
            e.preventDefault();
            const ok = await syncSupabase(sbUrl, sbKey);
            if (ok) { safeSetStorage('sf_supabase_url', sbUrl); safeSetStorage('sf_supabase_key', sbKey); showToast('✅ Connected!'); }
            else showToast('❌ Connection failed.');
          }}
          onSyncSupabase={() => syncSupabase()}
          onChangePin={(newPin) => {
            if (newPin.trim().length < 4) return;
            setAdminPin(newPin.trim()); safeSetStorage('sf_admin_pin', newPin.trim()); showToast('✅ PIN updated.');
          }}
          onOpenNewProduct={() => { setEditingItem(null); setShowProductModal(true); }}
          onOpenDirectShop={handleOpenDirectShop}
          onEditProduct={(item) => { setEditingItem(item); setShowProductModal(true); }}
          onDeleteProduct={(item) => setDeletingItem(item)}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onLockAdmin={() => { setIsAdmin(false); setActiveTab('store'); showToast('🔒 Logged out'); }}
        />
      )}

      {/* 미니멀 핀 모달 */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 bg-zinc-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] max-w-xs w-full p-8 shadow-2xl relative text-center">
            <button onClick={() => setShowPinModal(false)} className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-900">
              <X className="w-4 h-4" />
            </button>
            <Lock className="w-8 h-8 mx-auto text-zinc-900 mb-4" />
            <h3 className="text-lg font-black tracking-tight mb-6">Admin Access</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (pinInput.trim() === adminPin) { setIsAdmin(true); setShowPinModal(false); setActiveTab('admin'); showToast('🔓 Unlocked'); }
                else { setPinError('Invalid PIN'); }
              }}
              className="space-y-4"
            >
              <input
                type="password"
                autoFocus
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="PIN"
                className="w-full px-4 py-4 rounded-xl bg-zinc-50 border-none text-center text-xl font-black tracking-widest focus:ring-2 focus:ring-zinc-900 outline-none"
              />
              {pinError && <p className="text-xs font-bold text-red-500">{pinError}</p>}
              <button type="submit" className="w-full py-4 rounded-full bg-zinc-900 text-white text-sm font-bold shadow-lg">Enter</button>
            </form>
          </div>
        </div>
      )}

      {/* 삭제 모달 */}
      {deletingItem && (
        <div className="fixed inset-0 z-50 bg-zinc-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] max-w-sm w-full p-8 shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto">
               <Trash2 className="w-6 h-6"/>
            </div>
            <div>
               <h3 className="text-lg font-black text-zinc-900">Delete Product?</h3>
               <p className="text-sm text-zinc-500 mt-2">This action cannot be undone.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setDeletingItem(null)} className="flex-1 py-3 rounded-full bg-zinc-100 text-zinc-900 text-sm font-bold">Cancel</button>
              <button onClick={confirmDeleteProduct} className="flex-1 py-3 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* 상품 폼 모달 */}
      {showProductModal && (
        <ProductFormModal
          editingItem={editingItem}
          defaultVideoNumber={nextVideoNumber}
          lang={lang}
          onClose={() => setShowProductModal(false)}
          onSave={handleSaveProduct}
          onShowToast={showToast}
        />
      )}
    </div>
  );
}