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
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white shadow-sm">
            <InstagramIcon className="w-3 h-3" /> Reels
          </span>
        );
      case 'tiktok':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-zinc-950 text-white border border-cyan-400/50 shadow-sm">
            <Music2 className="w-3 h-3 text-cyan-400" /> TikTok
          </span>
        );
      case 'youtube':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-600 text-white shadow-sm">
            <YoutubeIcon className="w-3 h-3" /> Shorts
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-zinc-700 text-white">
            Featured
          </span>
        );
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 pt-6">
      <div className="text-center mb-5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 text-white text-[11px] font-bold mb-2.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          {isEn
            ? 'Official Global Short-Form Product Store (KR / EN)'
            : '홈페이지 연동 · 플랫폼 연동 · 직접 사진 업로드 독립 판매 스토어'}
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900">
          {isEn
            ? 'Shop Products Featured in Our Videos'
            : '영상에서 본 그 상품, 독립 판매페이지에서 바로 구매'}
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 mt-1">
          {isEn ? (
            <>
              Enter the <strong className="text-zinc-900">#VideoNumber</strong> to open its standalone product page & checkout globally.
            </>
          ) : (
            <>
              각 상품을 클릭하면 <strong className="text-zinc-900">개별 독립 판매페이지(`?shop=번호`)</strong>와 제3자 온라인 결제 폼으로 연결됩니다.
            </>
          )}
        </p>

        {/* 관리자 전용 빠른 직접 상품 등록 배너 (관리자 인증 시에만 노출) */}
        {isAdmin && (
          <div className="mt-4 inline-flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={onOpenManualCreate}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-xs transition-all"
            >
              <Camera className="w-3.5 h-3.5" />
              {isEn
                ? '+ [Admin] Create Standalone Page (Direct Photo Upload / URL)'
                : '+ [관리자 전용] 홈페이지 없이 직접 사진·내용 올려 판매페이지 만들기'}
            </button>
          </div>
        )}
      </div>

      {/* 상단 고정 번호 검색바 */}
      <div className="sticky top-16 z-30 bg-zinc-50/95 backdrop-blur-md py-3">
        <div className="relative">
          <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              isEn
                ? 'Search by Video # (e.g. 106) or product name...'
                : '영상 번호(예: 106, 105) 또는 상품명·키워드 입력...'
            }
            className="w-full pl-11 pr-10 py-3.5 bg-white border-2 border-zinc-900 rounded-2xl text-sm font-semibold text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-4 focus:ring-zinc-900/10 shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between gap-2 mt-3">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {[
              { id: 'all', label: isEn ? 'All Items' : '전체 보기' },
              { id: 'instagram', label: isEn ? 'Instagram Reels' : '인스타 릴스' },
              { id: 'tiktok', label: isEn ? 'TikTok' : '틱톡' },
              { id: 'youtube', label: isEn ? 'YouTube Shorts' : '유튜브 쇼츠' },
            ].map((plat) => (
              <button
                key={plat.id}
                onClick={() => setSelectedPlatform(plat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  selectedPlatform === plat.id
                    ? 'bg-zinc-900 text-white shadow-sm'
                    : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100'
                }`}
              >
                {plat.label}
              </button>
            ))}
          </div>
          <span className="text-xs font-bold text-zinc-500 shrink-0">
            {isEn ? `${filteredProducts.length} items` : `총 ${filteredProducts.length}개`}
          </span>
        </div>
      </div>

      {/* 상품 목록 그리드 */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-zinc-200 mt-4">
          <p className="text-base font-extrabold text-zinc-800">
            {isEn ? 'No matching products found.' : '일치하는 영상 번호나 상품이 없습니다.'}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedPlatform('all');
            }}
            className="mt-4 px-4 py-2 bg-zinc-900 text-white text-xs font-bold rounded-xl"
          >
            {isEn ? 'Show All Products' : '전체 상품 보기'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
          {filteredProducts.map((item) => {
            const post = item.shortform_posts;
            const isSummaryOpen = expandedSummaryId === item.id;
            const isDirectSale = item.sale_type === 'direct';

            const displayTitle = isEn ? item.name_en || item.name : item.name;
            const displayDesc = isEn
              ? item.description_en || item.description
              : item.description;
            const displayVideoTitle = isEn
              ? post?.title_en || post?.title
              : post?.title;
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
              <article
                key={item.id}
                className="bg-white rounded-3xl border border-zinc-200/90 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div
                    onClick={() => onOpenDirectShop(item)}
                    className="relative aspect-[4/3] bg-zinc-100 overflow-hidden cursor-pointer"
                  >
                    <img
                      src={
                        item.image_url ||
                        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&q=80'
                      }
                      alt={displayTitle}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />

                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="bg-zinc-950/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-xl text-xs font-black shadow">
                        #{post?.video_number || '-'}
                      </span>
                      <span className="bg-emerald-600 text-white px-2 py-1 rounded-xl text-[10px] font-black shadow">
                        {isEn ? 'Standalone Page' : '독립 판매페이지'}
                      </span>
                      {item.source_type === 'manual' && (
                        <span className="bg-indigo-600 text-white px-2 py-1 rounded-xl text-[10px] font-black shadow">
                          {isEn ? 'Direct Photo' : '직접등록'}
                        </span>
                      )}
                    </div>

                    <div className="absolute top-3 right-3">
                      {renderPlatformBadge(post?.platform)}
                    </div>

                    {displayBadge && (
                      <div className="absolute bottom-2.5 left-3">
                        <span className="inline-flex items-center gap-1 bg-amber-400 text-zinc-950 text-[11px] font-extrabold px-2.5 py-1 rounded-lg shadow">
                          <Sparkles className="w-3 h-3 fill-zinc-950" />
                          {displayBadge}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    {displayVideoTitle && (
                      <p className="text-[11px] font-semibold text-zinc-400 line-clamp-1 mb-1">
                        🎬 {displayVideoTitle}
                      </p>
                    )}
                    <h2
                      onClick={() => onOpenDirectShop(item)}
                      className="text-base font-extrabold text-zinc-900 leading-snug cursor-pointer hover:text-emerald-700"
                    >
                      {displayTitle}
                    </h2>
                    {displayDesc && (
                      <p className="text-xs text-zinc-500 mt-1 line-clamp-2">
                        {displayDesc}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-3">
                      {priceKrw > 0 ? (
                        <div>
                          <span className="text-base font-black text-zinc-900">
                            {isEn
                              ? `$${priceUsd.toLocaleString()} USD`
                              : `${priceKrw.toLocaleString()}원`}
                          </span>
                          <span className="text-[11px] font-bold text-zinc-400 ml-1.5">
                            {isEn
                              ? `(₩${priceKrw.toLocaleString()})`
                              : `($${priceUsd} USD)`}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs font-bold text-zinc-400">
                          {isEn ? 'Check Price inside' : '상세페이지 가격 확인'}
                        </span>
                      )}

                      {displaySummary && (
                        <button
                          onClick={() =>
                            setExpandedSummaryId(isSummaryOpen ? null : item.id)
                          }
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-lg transition-colors"
                        >
                          <Sparkles className="w-3 h-3" />
                          {isSummaryOpen
                            ? isEn
                              ? 'Hide'
                              : '요약 닫기'
                            : isEn
                            ? 'AI Highlights'
                            : 'AI 3줄 요약'}
                        </button>
                      )}
                    </div>

                    {isSummaryOpen && displaySummary && (
                      <div className="mt-3 p-3 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-xs text-zinc-700 whitespace-pre-line leading-relaxed">
                        {displaySummary}
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-4 pb-4 pt-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        onProductClick(item);
                        onOpenDirectShop(item);
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white text-xs font-extrabold rounded-2xl transition-all shadow-sm"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      {isEn
                        ? 'Open Product Page & Checkout'
                        : '독립 판매페이지 열기 & 결제'}
                    </button>

                    {!isDirectSale && item.purchase_url && (
                      <a
                        href={item.purchase_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => onProductClick(item)}
                        title={isEn ? 'External Platform' : '외부 쇼핑몰 바로가기'}
                        className="p-3 bg-zinc-900 hover:bg-zinc-800 text-white rounded-2xl transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}

                    <button
                      onClick={() => onCopyShopLink(item)}
                      title={
                        isEn
                          ? 'Copy Standalone Product Page Link'
                          : '독립 판매페이지 전용 링크 복사'
                      }
                      className="p-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-2xl transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* 관리자 전용 빠른 수정/삭제 바 */}
                  {isAdmin && (
                    <div className="flex items-center justify-end gap-1.5 pt-1 border-t border-zinc-100">
                      <span className="text-[10px] font-bold text-blue-600 mr-auto">
                        {isEn ? `${item.click_count || 0} views` : `클릭 ${item.click_count || 0}회`}
                      </span>
                      <button
                        onClick={() => onEditProduct(item)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-[11px] font-bold"
                      >
                        <Edit3 className="w-3 h-3" /> {isEn ? 'Edit' : '수정'}
                      </button>
                      <button
                        onClick={() => onDeleteProduct(item)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-[11px] font-bold"
                      >
                        <Trash2 className="w-3 h-3" /> {isEn ? 'Delete' : '삭제'}
                      </button>
                    </div>
                  )}
                </div>
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
  }, [product, lang]);

  if (!product) {
    return (
      <div className="max-w-lg mx-auto p-8 text-center">
        <p className="text-sm font-bold text-zinc-600">
          {isEn ? 'Product not found.' : '해당 상품 정보를 찾을 수 없습니다.'}
        </p>
        <button
          onClick={onBackToStore}
          className="mt-4 px-4 py-2 rounded-xl bg-zinc-900 text-white text-xs font-bold"
        >
          {isEn ? 'Back to Store' : '메인 스토어로 돌아가기'}
        </button>
      </div>
    );
  }

  const displayTitle = isEn ? product.name_en || product.name : product.name;
  const displayDesc = isEn
    ? product.description_en || product.description
    : product.description;
  const displayVideoTitle = isEn
    ? post?.title_en || post?.title
    : post?.title;
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
        ? '🌐 Global English Product Page URL copied!'
        : `🔗 #${post?.video_number || ''} 독립 판매페이지 링크가 복사되었습니다!`
    );
  };

  const handleOrderFormSubmit = async (e) => {
    e.preventDefault();
    if (!buyerName.trim() || !buyerPhone.trim() || !shippingAddress.trim()) {
      onShowToast(
        isEn
          ? '⚠️ Please fill in Recipient Name, Phone, and Shipping Address.'
          : '⚠️ 받는 분 성함, 연락처, 배송지를 모두 입력해 주세요.'
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
    } finally {
      setIsSubmitting(false);
    }
  };

  if (completedOrder) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl border border-zinc-200 p-6 shadow-xl text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <span className="text-xs font-extrabold text-emerald-600">
              {isEn
                ? `Order #${completedOrder.order_number}`
                : `주문번호 ${completedOrder.order_number}`}
            </span>
            <h1 className="text-xl font-black text-zinc-900 mt-1">
              {isEn
                ? 'Your Order is Confirmed!'
                : '주문 및 결제 접수가 완료되었습니다!'}
            </h1>
            <p className="text-xs text-zinc-500 mt-1">
              {isEn
                ? 'Your package will be dispatched within 1-2 business days with tracking info.'
                : '확인 후 영업일 기준 1~2일 이내 안전하게 출고됩니다.'}
            </p>
          </div>

          <div className="bg-zinc-50 rounded-2xl p-4 text-left text-xs space-y-2 border border-zinc-200">
            <div className="flex justify-between">
              <span className="text-zinc-500">{isEn ? 'Product' : '주문 상품'}</span>
              <span className="font-bold text-zinc-900 text-right max-w-[200px] truncate">
                {completedOrder.product_name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">{isEn ? 'Option / Qty' : '옵션 / 수량'}</span>
              <span className="font-bold text-zinc-900">
                {completedOrder.selected_option} × {completedOrder.quantity}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">{isEn ? 'Recipient' : '받는 분'}</span>
              <span className="font-bold text-zinc-900">
                {completedOrder.buyer_name} ({completedOrder.buyer_country})
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">{isEn ? 'Shipping Address' : '배송지'}</span>
              <span className="font-bold text-zinc-900 text-right max-w-[210px]">
                {completedOrder.shipping_address}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">{isEn ? 'Payment Method' : '결제 방식'}</span>
              <span className="font-bold text-indigo-700">
                {completedOrder.payment_method === 'bank_transfer'
                  ? isEn
                    ? 'Wire Transfer'
                    : '무통장 입금'
                  : `${completedOrder.payment_provider} (Online Form)`}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-zinc-200">
              <span className="font-bold text-zinc-700">
                {isEn ? 'Total Amount' : '총 결제 금액'}
              </span>
              <span className="text-base font-black text-emerald-600">
                {formatMoney(completedOrder.total_price, completedOrder.total_price_usd)}
              </span>
            </div>
          </div>

          {activeThirdPartyUrl && completedOrder.payment_method !== 'bank_transfer' && (
            <a
              href={activeThirdPartyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-md"
            >
              <CreditCard className="w-4 h-4" />
              {isEn
                ? 'Open External 3rd-Party Payment Receipt / Page'
                : '제3자 온라인 결제창 새 탭에서 다시 열기'}
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          {completedOrder.payment_method === 'bank_transfer' && (
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-left text-xs text-amber-950 space-y-1">
              <p className="font-extrabold">
                {isEn ? '🏦 Bank Wire Instructions' : '🏦 입금 계좌 안내'}
              </p>
              <p className="font-bold">{bankAccountInfo}</p>
            </div>
          )}

          <button
            onClick={onBackToStore}
            className="w-full py-3.5 rounded-2xl bg-zinc-900 text-white text-xs font-extrabold"
          >
            {isEn ? 'Back to All Products' : '전체 스토어 목록으로 돌아가기'}
          </button>
        </div>
      </div>
    );
  }

  const sourceLabel =
    product.source_type === 'manual'
      ? isEn
        ? '📸 Direct Creator Upload'
        : '📸 직접 등록 공식페이지'
      : product.source_type === 'homepage'
      ? isEn
        ? '🌐 Brand Homepage Sync'
        : '🌐 홈페이지 연동 상품'
      : isEn
      ? '🛒 Platform Verified'
      : '🛒 플랫폼 연동 상품';

  return (
    <div className="pb-28">
      <div className="max-w-2xl mx-auto bg-white border-x border-b border-zinc-200 shadow-xs">
        <div className="px-4 py-3 border-b border-zinc-100 flex flex-wrap items-center justify-between gap-2 bg-zinc-50/70">
          <button
            onClick={onBackToStore}
            className="inline-flex items-center gap-1 text-xs font-bold text-zinc-700 hover:text-zinc-900"
          >
            <ChevronLeft className="w-4 h-4" />
            {isEn ? 'All Products' : '전체 상품 보기'}
          </button>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-black bg-zinc-900 text-white px-2.5 py-1 rounded-lg">
              #{post?.video_number || '-'}
            </span>
            <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-lg">
              {sourceLabel}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={onToggleLang}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl border border-zinc-300 bg-white hover:bg-zinc-100 text-[11px] font-extrabold text-zinc-800 shadow-2xs"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-600" />
              {isEn ? '한국어 (KRW)' : 'GLOBAL (EN / USD)'}
            </button>
            <button
              onClick={() => handleCopyDirectUrl(lang)}
              className="p-1.5 rounded-xl bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-100"
              title={isEn ? 'Copy Direct Page URL' : '독립 판매페이지 주소 복사'}
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 1. 대표 상품 이미지 & 멀티 사진 갤러리 */}
        <div className="bg-zinc-100">
          <div className="relative aspect-square sm:aspect-[4/3] bg-zinc-100 overflow-hidden">
            <img
              src={activeImage}
              alt={displayTitle}
              className="w-full h-full object-cover"
            />
            {displayBadge && (
              <div className="absolute bottom-3 left-3">
                <span className="inline-flex items-center gap-1 bg-amber-400 text-zinc-950 text-xs font-black px-3 py-1.5 rounded-xl shadow">
                  <Sparkles className="w-3.5 h-3.5 fill-zinc-950" />
                  {displayBadge}
                </span>
              </div>
            )}
          </div>

          {gallery.length > 1 && (
            <div className="px-4 py-3 bg-white border-b border-zinc-100 flex items-center gap-2 overflow-x-auto">
              {gallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(imgUrl)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                    activeImage === imgUrl
                      ? 'border-zinc-900 scale-105 shadow-xs'
                      : 'border-zinc-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 2. 상품 타이틀 · 가격(KRW/USD) · 글로벌 배송 배지 */}
        <div className="p-5 sm:p-6 space-y-3 border-b border-zinc-100">
          {displayVideoTitle && (
            <p className="text-xs font-bold text-indigo-600">🎬 {displayVideoTitle}</p>
          )}
          <h1 className="text-xl sm:text-2xl font-black text-zinc-900 leading-snug">
            {displayTitle}
          </h1>
          {displayDesc && (
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              {displayDesc}
            </p>
          )}

          <div className="flex flex-wrap items-baseline justify-between gap-2 pt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-zinc-900">
                {formatMoney(unitPriceKrw, unitPriceUsd)}
              </span>
              <span className="text-xs font-bold text-zinc-400">
                {isEn
                  ? `(approx. ₩${unitPriceKrw.toLocaleString()} KRW)`
                  : `(해외결제 약 $${unitPriceUsd} USD)`}
              </span>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              {isEn
                ? '✈️ Worldwide Express Shipping Available'
                : '🚚 국내 당일출고 · 해외 EMS/DHL 발송 가능'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-3 text-[11px] text-zinc-700">
            <div className="flex items-center gap-2 bg-zinc-50 p-2.5 rounded-xl border border-zinc-200/70">
              <CreditCard className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>
                {isEn
                  ? `3rd-Party Checkout (${product.payment_provider || 'Stripe/PayPal'})`
                  : `제3자 온라인 안전결제 (${product.payment_provider || '카드/간편결제'})`}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-zinc-50 p-2.5 rounded-xl border border-zinc-200/70">
              <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {isEn
                  ? 'Free Shipping over $100 USD'
                  : '5만원 이상 무료배송 · 해외배송 지원'}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-zinc-50 p-2.5 rounded-xl border border-zinc-200/70">
              <ShieldCheck className="w-4 h-4 text-zinc-900 shrink-0" />
              <span>
                {isEn ? '100% Authentic & Buyer Protection' : '공식 검수 완료 · 안전 구매보증'}
              </span>
            </div>
          </div>
        </div>

        {/* 3. 즉시 옵션 선택 & 제3자 온라인 결제 바로가기 프리뷰 박스 */}
        <div className="p-5 sm:p-6 bg-emerald-50/40 border-b border-zinc-100 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-zinc-900">
              {isEn ? 'Quick Option & Quantity Selection' : '옵션 및 수량 바로 선택'}
            </span>
            <span className="text-[11px] font-bold text-emerald-700">
              {isEn ? 'In Stock · Ready to Ship' : '재고 보유 · 즉시 주문 가능'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="sm:col-span-2">
              <select
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-white text-xs font-bold"
              >
                {localizedOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-between bg-white border border-zinc-300 rounded-xl px-3 py-1.5">
              <span className="text-xs font-bold text-zinc-500">
                {isEn ? 'Qty' : '수량'}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-1 hover:bg-zinc-100 rounded-lg"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center text-xs font-black">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-1 hover:bg-zinc-100 rounded-lg"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 text-xs">
            <span className="font-bold text-zinc-600">
              {isEn ? 'Estimated Total (incl. Shipping)' : '예상 결제 금액 (배송비 포함)'}
            </span>
            <span className="text-base font-black text-emerald-700">
              {formatMoney(totalKrw, totalUsd)}
            </span>
          </div>
        </div>

        {/* 4. AI 핵심 요약 및 직접 등록한 상세 스토리 블록 */}
        <div className="p-5 sm:p-6 space-y-6">
          {displaySummary && (
            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 space-y-1.5">
              <p className="text-xs font-black text-indigo-950 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                {isEn ? 'Key Highlights Before You Buy' : '구매 전 핵심 체크포인트'}
              </p>
              <p className="text-xs text-zinc-700 whitespace-pre-line leading-relaxed">
                {displaySummary}
              </p>
            </div>
          )}

          {Array.isArray(product.detail_blocks) && product.detail_blocks.length > 0 && (
            <div className="space-y-5">
              <div className="flex items-center gap-1.5 border-b border-zinc-200 pb-2">
                <Camera className="w-4 h-4 text-zinc-900" />
                <h2 className="text-sm font-black text-zinc-900">
                  {isEn ? 'Product Visual Story & Details' : '상세 사진 및 제품 특장점'}
                </h2>
              </div>

              {product.detail_blocks.map((blk, idx) => (
                <div
                  key={blk.id || idx}
                  className="rounded-2xl border border-zinc-200 overflow-hidden bg-zinc-50/50"
                >
                  {blk.image && (
                    <img
                      src={blk.image}
                      alt={isEn ? blk.title_en || blk.title : blk.title}
                      className="w-full max-h-96 object-cover"
                    />
                  )}
                  <div className="p-4 space-y-1.5">
                    {(blk.title || blk.title_en) && (
                      <h3 className="text-sm font-black text-zinc-900">
                        {isEn ? blk.title_en || blk.title : blk.title}
                      </h3>
                    )}
                    {(blk.content || blk.content_en) && (
                      <p className="text-xs text-zinc-600 leading-relaxed whitespace-pre-line">
                        {isEn ? blk.content_en || blk.content : blk.content}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {Array.isArray(product.specs) && product.specs.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-zinc-900" />
                <h2 className="text-sm font-black text-zinc-900">
                  {isEn ? 'Technical Specifications' : '제품 상세 스펙 및 규격'}
                </h2>
              </div>
              <div className="rounded-2xl border border-zinc-200 overflow-hidden">
                {product.specs.map((sp, idx) => (
                  <div
                    key={idx}
                    className={`grid grid-cols-3 text-xs p-3 ${
                      idx % 2 === 0 ? 'bg-zinc-50' : 'bg-white'
                    } border-b last:border-b-0 border-zinc-200`}
                  >
                    <span className="font-bold text-zinc-600">{sp.label}</span>
                    <span className="col-span-2 font-semibold text-zinc-900">
                      {sp.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            {post?.video_url && (
              <a
                href={post.video_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                {isEn ? 'Watch Original Short Video' : '원본 숏폼 영상 보기'}
              </a>
            )}
            {product.purchase_url && product.source_type !== 'manual' && (
              <a
                href={product.purchase_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold flex items-center justify-center gap-1.5"
              >
                {isEn ? 'Reference Source Page' : '연동된 원본 웹페이지 보기'}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* 하단 고정(Sticky) 글로벌 구매 & 제3자 결제 바 */}
      <div className="fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-zinc-200 p-3.5 shadow-lg">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <div className="shrink-0">
            <span className="block text-[10px] font-bold text-zinc-400">
              {isEn ? 'Total Price' : '총 주문 금액'}
            </span>
            <span className="text-base font-black text-zinc-900">
              {formatMoney(totalKrw, totalUsd)}
            </span>
          </div>
          <button
            onClick={() => setIsOrderSheetOpen(true)}
            className="flex-1 py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white text-xs sm:text-sm font-black shadow-md transition-all flex items-center justify-center gap-2"
          >
            <CreditCard className="w-4 h-4" />
            {isEn
              ? 'Buy Now (3rd-Party Online Checkout)'
              : '구매하기 (제3자 온라인 결제 폼)'}
          </button>
        </div>
      </div>

      {/* 주문서 작성 & 제3자 온라인 결제 폼 연동 바텀시트 모달 */}
      {isOrderSheetOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl max-h-[92vh] overflow-y-auto p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
              <div>
                <h3 className="text-base font-black text-zinc-900">
                  {isEn ? 'Global Order & Checkout Form' : '주문서 작성 및 온라인 결제'}
                </h3>
                <p className="text-[11px] text-zinc-500">
                  {isEn
                    ? 'Supports worldwide shipping & 3rd-party online payment gateway'
                    : '국내 및 해외 배송지 입력 후 제3자 온라인 결제 폼으로 안전하게 결제합니다.'}
                </p>
              </div>
              <button
                onClick={() => setIsOrderSheetOpen(false)}
                className="p-1.5 rounded-xl hover:bg-zinc-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleOrderFormSubmit} className="space-y-4 mt-4">
              <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-zinc-600 mb-1">
                    {isEn ? 'Select Option' : '상품 옵션 선택'}
                  </label>
                  <select
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 bg-white text-xs font-bold"
                  >
                    {localizedOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-700">
                    {isEn ? 'Quantity' : '주문 수량'}
                  </span>
                  <div className="flex items-center gap-2 bg-white border border-zinc-300 rounded-xl p-1">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-1.5 hover:bg-zinc-100 rounded-lg"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center text-xs font-black">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="p-1.5 hover:bg-zinc-100 rounded-lg"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-black text-zinc-900">
                    {isEn
                      ? 'Shipping Information (Worldwide)'
                      : '배송지 정보 (국내·해외 모두 가능)'}
                  </p>
                  <button
                    type="button"
                    onClick={onToggleLang}
                    className="text-[11px] font-bold text-indigo-600 hover:underline"
                  >
                    {isEn ? '한국어 입력 전환' : 'Switch to English Form'}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder={isEn ? 'Full Name *' : '받는 분 성함 *'}
                    className="px-3.5 py-2.5 rounded-xl border border-zinc-300 text-xs"
                  />
                  <input
                    type="tel"
                    required
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    placeholder={
                      isEn ? 'Phone (+1-000-0000) *' : '연락처 (010-0000-0000) *'
                    }
                    className="px-3.5 py-2.5 rounded-xl border border-zinc-300 text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={buyerCountry}
                    onChange={(e) => setBuyerCountry(e.target.value)}
                    className="px-3 py-2.5 rounded-xl border border-zinc-300 bg-white text-xs font-bold"
                  >
                    <option value="대한민국 (South Korea)">대한민국 (South Korea)</option>
                    <option value="United States">United States (USA)</option>
                    <option value="United Kingdom">United Kingdom (UK)</option>
                    <option value="Japan">Japan (日本)</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Australia">Australia</option>
                    <option value="Canada">Canada</option>
                    <option value="Germany / EU">Germany / EU</option>
                    <option value="Other International">Other Country (Global)</option>
                  </select>
                  <input
                    type="email"
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    placeholder={
                      isEn ? 'Email for Receipt' : '이메일 (영수증·송장 안내용)'
                    }
                    className="px-3.5 py-2.5 rounded-xl border border-zinc-300 text-xs"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    required
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    placeholder={
                      isEn
                        ? 'Street Address, City, State *'
                        : '도로명 주소 및 상세 주소 *'
                    }
                    className="col-span-2 px-3.5 py-2.5 rounded-xl border border-zinc-300 text-xs"
                  />
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder={isEn ? 'ZIP / Postal' : '우편번호'}
                    className="px-3 py-2.5 rounded-xl border border-zinc-300 text-xs"
                  />
                </div>

                <input
                  type="text"
                  value={deliveryMemo}
                  onChange={(e) => setDeliveryMemo(e.target.value)}
                  placeholder={
                    isEn
                      ? 'Delivery Notes / Customs ID (Optional)'
                      : '배송 요청사항 (문 앞 보관 등)'
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-xs"
                />
              </div>

              <div className="space-y-2">
                <p className="text-xs font-black text-zinc-900">
                  {isEn
                    ? 'Payment Method (3rd-Party Gateway)'
                    : '결제 방식 (제3자 온라인 결제 폼 연동)'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('third_party_form')}
                    className={`p-3 rounded-xl border text-xs font-extrabold flex items-center justify-center gap-1.5 ${
                      paymentMethod === 'third_party_form'
                        ? 'border-indigo-600 bg-indigo-600 text-white shadow-xs'
                        : 'border-zinc-300 bg-white text-zinc-700'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    {isEn ? '3rd-Party Payment Form' : '제3자 온라인 결제폼'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('global_card')}
                    className={`p-3 rounded-xl border text-xs font-extrabold flex items-center justify-center gap-1.5 ${
                      paymentMethod === 'global_card'
                        ? 'border-emerald-600 bg-emerald-600 text-white shadow-xs'
                        : 'border-zinc-300 bg-white text-zinc-700'
                    }`}
                  >
                    <Globe className="w-4 h-4" />
                    {isEn ? 'PayPal / Global Card' : '해외카드 / PayPal'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank_transfer')}
                    className={`p-3 rounded-xl border text-xs font-extrabold flex items-center justify-center gap-1.5 ${
                      paymentMethod === 'bank_transfer'
                        ? 'border-zinc-900 bg-zinc-900 text-white shadow-xs'
                        : 'border-zinc-300 bg-white text-zinc-700'
                    }`}
                  >
                    {isEn ? 'Wire Transfer' : '무통장 입금'}
                  </button>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs space-y-1">
                <div className="flex justify-between text-zinc-600">
                  <span>
                    {isEn ? `Subtotal (${quantity} items)` : `상품 금액 (${quantity}개)`}
                  </span>
                  <span>
                    {formatMoney(unitPriceKrw * quantity, unitPriceUsd * quantity)}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>{isEn ? 'Shipping Fee' : '배송비'}</span>
                  <span>
                    {(isEn ? deliveryFeeUsd : deliveryFeeKrw) === 0
                      ? isEn
                        ? 'FREE'
                        : '무료'
                      : formatMoney(deliveryFeeKrw, deliveryFeeUsd)}
                  </span>
                </div>
                <div className="flex justify-between pt-1.5 border-t border-emerald-200 font-black text-sm text-emerald-950">
                  <span>{isEn ? 'Total Due' : '최종 결제 금액'}</span>
                  <span>{formatMoney(totalKrw, totalUsd)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-black shadow-lg flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                {isSubmitting
                  ? isEn
                    ? 'Processing...'
                    : '주문 처리 중...'
                  : isEn
                  ? `Proceed to Payment Form (${formatMoney(totalKrw, totalUsd)})`
                  : `${formatMoney(totalKrw, totalUsd)} 제3자 온라인 결제창 열기`}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 제3자 온라인 결제 폼 임베드/브릿지 모달 */}
      {isThirdPartyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-zinc-200">
            <div className="bg-indigo-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span className="text-xs font-black">
                  {product.payment_provider || '3rd-Party Secure Checkout Form'}
                </span>
              </div>
              <button
                onClick={() => setIsThirdPartyModalOpen(false)}
                className="p-1 rounded-lg hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-1 text-xs">
                <p className="font-bold text-zinc-500">
                  {isEn ? 'Order Summary' : '결제 대상 상품'}
                </p>
                <p className="text-sm font-black text-zinc-900">
                  {displayTitle} ({selectedOption} × {quantity})
                </p>
                <p className="text-base font-black text-indigo-600 pt-1">
                  {formatMoney(totalKrw, totalUsd)}
                </p>
              </div>

              {activeThirdPartyUrl && (
                <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-2">
                  <p className="text-xs font-extrabold text-indigo-950">
                    {isEn
                      ? '🔗 External 3rd-Party Payment Link Connected'
                      : '🔗 연동된 제3자 온라인 결제 폼 주소'}
                  </p>
                  <p className="text-[11px] text-indigo-700 break-all font-mono bg-white p-2 rounded-lg border border-indigo-100">
                    {activeThirdPartyUrl}
                  </p>
                  <a
                    href={activeThirdPartyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    {isEn ? 'Open Payment Form in New Tab' : '새 창에서 제3자 결제 폼 열기'}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              <div className="space-y-2.5 pt-1">
                <p className="text-[11px] font-bold text-zinc-500">
                  {isEn
                    ? 'After completing payment in the 3rd-party form (or to test instant checkout), click below to record your order:'
                    : '제3자 온라인 결제 폼에서 결제를 마쳤거나 테스트 주문을 완료하려면 아래 버튼을 눌러주세요.'}
                </p>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => finalizeOrderSubmission('paid')}
                  className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-md"
                >
                  {isEn
                    ? '✅ Confirm Payment & Complete Order'
                    : '✅ 제3자 결제 폼 결제 완료 및 주문 접수하기'}
                </button>
              </div>
            </div>
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
    <main className="max-w-5xl mx-auto px-4 pt-6 space-y-6">
      <div className="bg-zinc-900 text-white rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" /> 글로벌 커머스 관리자 센터 (KR / EN)
          </div>
          <h1 className="text-xl font-black">독립 판매 페이지 · 제3자 결제 통합 관리</h1>
          <p className="text-xs text-zinc-400 mt-1">
            ① 홈페이지 연동 ② 온라인 플랫폼 연동 ③ 무홈페이지 직접 사진 업로드 상품 및 국내외(KRW/USD) 주문을 관리합니다.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenNewProduct}
            className="inline-flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs font-black shadow"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" /> 새 상품 / 직접 사진 등록
          </button>
          <button
            onClick={onLockAdmin}
            className="inline-flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold"
          >
            <Lock className="w-4 h-4" /> 잠금
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm">
          <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-500">
            <ShoppingBag className="w-4 h-4 text-emerald-600" /> 누적 주문 건수
          </div>
          <p className="text-2xl font-black text-emerald-600 mt-1.5">{orders.length}건</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm">
          <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-500">
            <Package className="w-4 h-4 text-zinc-900" /> 독립 판매 상품 수
          </div>
          <p className="text-2xl font-black mt-1.5">{products.length}개</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm">
          <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-500">
            <MousePointerClick className="w-4 h-4 text-blue-600" /> 누적 페이지 조회
          </div>
          <p className="text-2xl font-black text-blue-600 mt-1.5">
            {totalClicks.toLocaleString()}회
          </p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm">
          <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-500">
            <Database className="w-4 h-4 text-indigo-600" /> 누적 주문액 (KRW 환산)
          </div>
          <p className="text-xl font-black text-zinc-900 mt-2">
            {totalSalesAmount.toLocaleString()}원
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-zinc-200 pb-3">
        {[
          { id: 'orders', label: `📦 국내·해외 주문 내역 (${orders.length})` },
          { id: 'products', label: `🏷️ 독립 판매페이지 & 상품 관리 (${products.length})` },
          { id: 'settings', label: '⚙️ 제3자 결제 폼 · DB · 계좌 설정' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setAdminSubTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
              adminSubTab === tab.id
                ? 'bg-zinc-900 text-white shadow-sm'
                : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {adminSubTab === 'orders' && (
        <section className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold">실시간 국내·해외 고객 주문 접수 목록</h2>
            {dbConnected && (
              <button
                onClick={onSyncSupabase}
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncingDb ? 'animate-spin' : ''}`} />
                주문 새로고침
              </button>
            )}
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-12 text-xs text-zinc-400">
              아직 접수된 주문 내역이 없습니다.
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((order) => (
                <div
                  key={order.id || order.order_number}
                  className="p-4 rounded-2xl border border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {order.order_number}
                      </span>
                      <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                        {order.currency === 'USD'
                          ? '🌐 해외주문 (EN/USD)'
                          : '🇰🇷 국내주문 (KRW)'}
                      </span>
                      <span className="text-[11px] font-bold text-zinc-500">
                        결제: {order.payment_provider || order.payment_method}
                      </span>
                    </div>
                    <p className="text-sm font-extrabold text-zinc-900">
                      {order.product_name} ({order.selected_option} / {order.quantity}개)
                    </p>
                    <p className="text-xs text-zinc-600">
                      받는분: <strong>{order.buyer_name}</strong> ({order.buyer_phone}) |{' '}
                      {order.buyer_country ? `[${order.buyer_country}] ` : ''}
                      {order.shipping_address}
                    </p>
                    {order.delivery_memo && (
                      <p className="text-[11px] text-zinc-400">메모: {order.delivery_memo}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-zinc-100">
                    <div className="text-right">
                      <span className="block text-sm font-black text-zinc-900">
                        {order.currency === 'USD' && order.total_price_usd
                          ? `$${Number(order.total_price_usd).toLocaleString()} USD`
                          : `${Number(order.total_price).toLocaleString()}원`}
                      </span>
                    </div>
                    <select
                      value={order.order_status || 'pending_payment'}
                      onChange={(e) => onUpdateOrderStatus(order, e.target.value)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border ${
                        order.order_status === 'shipped'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : order.order_status === 'paid'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}
                    >
                      <option value="pending_payment">결제 확인중</option>
                      <option value="paid">결제 완료 (출고대기)</option>
                      <option value="shipped">국내/해외 발송완료</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {adminSubTab === 'products' && (
        <section className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-base font-extrabold flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-zinc-900" />
              등록 상품 및 독립 판매페이지 목록
            </h2>
            <button
              onClick={onOpenNewProduct}
              className="text-xs font-bold text-emerald-700 hover:underline"
            >
              + 새 상품 등록 (홈페이지/플랫폼/직접업로드)
            </button>
          </div>

          {[...products]
            .sort((a, b) => (b.click_count || 0) - (a.click_count || 0))
            .map((item) => {
              const post = item.shortform_posts;
              const srcBadge =
                item.source_type === 'manual'
                  ? '📸 직접 사진·내용 업로드'
                  : item.source_type === 'homepage'
                  ? '🌐 홈페이지 연동'
                  : '🛒 온라인 플랫폼 연동';
              return (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl border border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={
                        item.image_url ||
                        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80'
                      }
                      alt={item.name}
                      className="w-12 h-12 rounded-xl object-cover border border-zinc-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                        <span className="px-2 py-0.5 bg-zinc-900 text-white rounded text-[11px] font-black">
                          #{post?.video_number || '-'}번
                        </span>
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[10px] font-bold">
                          {srcBadge}
                        </span>
                        {item.name_en && (
                          <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded text-[10px] font-bold">
                            EN 영문지원
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-extrabold text-zinc-900 truncate">
                        {item.name}
                      </p>
                      {item.name_en && (
                        <p className="text-[11px] text-zinc-400 truncate">
                          {item.name_en}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onOpenDirectShop(item)}
                      className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold inline-flex items-center gap-1"
                    >
                      판매페이지 열기 <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onEditProduct(item)}
                      className="p-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700"
                      title="상품 수정"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteProduct(item)}
                      className="p-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600"
                      title="상품 삭제"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
        </section>
      )}

      {adminSubTab === 'settings' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSaveThirdPartyDefaultUrl(paymentUrlInput);
              }}
              className="bg-white rounded-2xl border border-zinc-200 p-5 space-y-2.5 shadow-sm"
            >
              <h2 className="text-sm font-extrabold flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-indigo-600" />
                기본 제3자 온라인 결제 폼 URL (Stripe / PayPal / 포트원 등)
              </h2>
              <p className="text-[11px] text-zinc-500">
                개별 상품에 별도 결제 링크가 없을 때 공통으로 연결할 제3자 온라인 결제 폼 주소입니다.
              </p>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={paymentUrlInput}
                  onChange={(e) => setPaymentUrlInput(e.target.value)}
                  placeholder="https://buy.stripe.com/... 또는 https://paypal.me/..."
                  className="flex-1 px-3 py-2 rounded-xl border border-zinc-300 text-xs"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shrink-0"
                >
                  저장
                </button>
              </div>
            </form>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSaveBankAccount(bankInput);
              }}
              className="bg-white rounded-2xl border border-zinc-200 p-5 space-y-2.5 shadow-sm"
            >
              <h2 className="text-sm font-extrabold flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-zinc-900" />
                보조 무통장 입금 계좌 안내 문구
              </h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={bankInput}
                  onChange={(e) => setBankInput(e.target.value)}
                  placeholder="예: 카카오뱅크 3333-00-0000000 (예금주: 숏픽스토어)"
                  className="flex-1 px-3 py-2 rounded-xl border border-zinc-300 text-xs"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-zinc-900 text-white text-xs font-bold shrink-0"
                >
                  저장
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-4">
            <form
              onSubmit={onConnectSupabase}
              className="bg-white rounded-2xl border border-zinc-200 p-5 space-y-3 shadow-sm"
            >
              <h2 className="text-sm font-extrabold flex items-center gap-1.5">
                <Database className="w-4 h-4 text-emerald-600" />
                Supabase 실시간 데이터베이스 연결
              </h2>
              <p className="text-[11px] text-zinc-500">
                상태: {dbConnected ? '● 실시간 연결됨' : '● 로컬 브라우저 저장 모드'}
              </p>
              <input
                type="url"
                value={sbUrl}
                onChange={(e) => setSbUrl(e.target.value)}
                placeholder="https://프로젝트ID.supabase.co"
                className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-xs"
              />
              <input
                type="password"
                value={sbKey}
                onChange={(e) => setSbKey(e.target.value)}
                placeholder="Supabase anon public 키"
                className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-xs"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
              >
                DB 연결 및 동기화
              </button>
            </form>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onChangePin(newPinInput);
                setNewPinInput('');
              }}
              className="bg-white rounded-2xl border border-zinc-200 p-5 space-y-2.5 shadow-sm"
            >
              <h2 className="text-sm font-extrabold flex items-center gap-1.5">
                <KeyRound className="w-4 h-4 text-zinc-900" />
                관리자 PIN 비밀번호 변경 (현재: {adminPin})
              </h2>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={newPinInput}
                  onChange={(e) => setNewPinInput(e.target.value)}
                  placeholder="새 비밀번호 (4자리 이상)"
                  className="flex-1 px-3 py-2 rounded-xl border border-zinc-300 text-xs"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-zinc-900 text-white text-xs font-bold shrink-0"
                >
                  변경
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto p-5 sm:p-6 shadow-2xl border border-zinc-200 my-auto">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
          <div>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-black mb-1">
              KR / EN 글로벌 독립 판매 페이지 빌더 (관리자 전용)
            </span>
            <h2 className="text-lg font-black text-zinc-900">
              {editingItem
                ? '상품 및 독립 판매페이지 수정'
                : '새 상품 & 독립 판매페이지 만들기'}
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              ① 홈페이지 연동 ② 온라인 플랫폼 연동 ③ 홈페이지 없이 직접 사진·내용 업로드 중 선택하세요.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-zinc-100 text-zinc-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 mt-5">
          <div className="space-y-2">
            <label className="block text-xs font-black text-zinc-900">
              1. 상품 콘텐츠 등록 방식 선택
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 bg-zinc-100 rounded-2xl">
              <button
                type="button"
                onClick={() => setSourceType('homepage')}
                className={`py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all ${
                  sourceType === 'homepage'
                    ? 'bg-zinc-900 text-white shadow'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                ① 홈페이지에서 가져오기
              </button>
              <button
                type="button"
                onClick={() => setSourceType('platform')}
                className={`py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all ${
                  sourceType === 'platform'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                ② 온라인 플랫폼에서 가져오기
              </button>
              <button
                type="button"
                onClick={() => {
                  setSourceType('manual');
                  setSaleType('direct');
                }}
                className={`py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all ${
                  sourceType === 'manual'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                ③ 직접 사진·내용 올리기 (무홈페이지)
              </button>
            </div>
          </div>

          {sourceType !== 'manual' ? (
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-blue-950">
                  {sourceType === 'homepage'
                    ? '🌐 브랜드/자사 홈페이지 상품 URL 입력'
                    : '🛒 스마트스토어 · 쿠팡 · 아마존 등 온라인 플랫폼 URL 입력'}
                </span>
                <span className="text-[11px] font-bold text-blue-700">
                  OG 메타태그 자동 추출 지원
                </span>
              </div>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={purchaseUrl}
                  onChange={(e) => setPurchaseUrl(e.target.value)}
                  placeholder={
                    sourceType === 'homepage'
                      ? 'https://mybrand.com/products/item-1'
                      : 'https://smartstore.naver.com/... 또는 https://coupang.com/...'
                  }
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-blue-300 bg-white text-xs"
                />
                <button
                  type="button"
                  onClick={handleScrapeUrl}
                  disabled={isScraping}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shrink-0 inline-flex items-center gap-1.5 shadow-xs"
                >
                  {isScraping ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Wand2 className="w-3.5 h-3.5" />
                  )}
                  내용 자동 가져오기
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
              <p className="text-xs font-black text-emerald-950 flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-emerald-600" />
                홈페이지가 없어도 독립된 전용 상품 판매 페이지를 바로 생성합니다!
              </p>
              <p className="text-[11px] text-emerald-800">
                스마트폰이나 PC에 있는 상품 사진 여러 장과 상세 소개글을 올리면, 국내(KRW) 및 해외(USD) 고객이 모두 구매할 수 있는 독립 판매 페이지(`?shop=번호`)가 만들어집니다.
              </p>
            </div>
          )}

          <div className="p-4 rounded-2xl border-2 border-zinc-900 bg-zinc-50/60 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black text-zinc-900 flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-emerald-600" />
                2. 상품 사진 갤러리 & 상세페이지 직접 구성 폼
              </h3>
              <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-xs">
                <Upload className="w-3.5 h-3.5" />
                내 기기에서 사진 여러 장 올리기
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleMainImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="대표 이미지 URL 직접 입력 또는 우측 상단 '사진 여러 장 올리기' 클릭"
                  className="flex-1 px-3 py-2 rounded-xl border border-zinc-300 bg-white text-xs"
                />
                {imageUrl && (
                  <button
                    type="button"
                    onClick={() => {
                      if (!galleryImages.includes(imageUrl)) {
                        setGalleryImages((prev) => [...prev, imageUrl]);
                      }
                    }}
                    className="px-3 py-2 rounded-xl bg-zinc-900 text-white text-xs font-bold shrink-0"
                  >
                    갤러리에 추가
                  </button>
                )}
              </div>

              {galleryImages.length > 0 && (
                <div className="flex items-center gap-2 overflow-x-auto py-1">
                  {galleryImages.map((img, idx) => (
                    <div
                      key={idx}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 group ${
                        imageUrl === img ? 'border-emerald-600' : 'border-zinc-200'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`갤러리 ${idx + 1}`}
                        onClick={() => setImageUrl(img)}
                        className="w-full h-full object-cover cursor-pointer"
                        title="클릭하여 대표 이미지로 지정"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const next = galleryImages.filter((_, i) => i !== idx);
                          setGalleryImages(next);
                          if (imageUrl === img) setImageUrl(next[0] || '');
                        }}
                        className="absolute top-0.5 right-0.5 bg-black/70 text-white rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2.5 pt-2 border-t border-zinc-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-zinc-800">
                  📝 상세페이지 본문 섹션 (사진 + 특장점 설명)
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setDetailBlocks((prev) => [
                      ...prev,
                      {
                        id: `blk-${Date.now()}-${prev.length}`,
                        title: '',
                        title_en: '',
                        content: '',
                        content_en: '',
                        image: '',
                      },
                    ])
                  }
                  className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-700 hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" /> 상세 섹션 추가
                </button>
              </div>

              {detailBlocks.map((blk, idx) => (
                <div
                  key={blk.id || idx}
                  className="p-3 rounded-2xl bg-white border border-zinc-200 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black text-zinc-500">
                      상세 섹션 #{idx + 1}
                    </span>
                    {detailBlocks.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          setDetailBlocks((prev) => prev.filter((_, i) => i !== idx))
                        }
                        className="text-red-500 hover:text-red-700 text-[11px] font-bold inline-flex items-center gap-0.5"
                      >
                        <Trash2 className="w-3 h-3" /> 삭제
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={blk.title}
                      onChange={(e) =>
                        setDetailBlocks((prev) =>
                          prev.map((item, i) =>
                            i === idx ? { ...item, title: e.target.value } : item
                          )
                        )
                      }
                      placeholder="섹션 소제목 (한국어, 예: 1분 폴딩 초경량 설계)"
                      className="px-3 py-1.5 rounded-xl border border-zinc-300 text-xs font-bold"
                    />
                    <input
                      type="text"
                      value={blk.title_en}
                      onChange={(e) =>
                        setDetailBlocks((prev) =>
                          prev.map((item, i) =>
                            i === idx ? { ...item, title_en: e.target.value } : item
                          )
                        )
                      }
                      placeholder="Section Title (English, 선택사항)"
                      className="px-3 py-1.5 rounded-xl border border-zinc-300 text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <textarea
                      rows={2}
                      value={blk.content}
                      onChange={(e) =>
                        setDetailBlocks((prev) =>
                          prev.map((item, i) =>
                            i === idx ? { ...item, content: e.target.value } : item
                          )
                        )
                      }
                      placeholder="상세 설명 내용 (한국어)"
                      className="px-3 py-1.5 rounded-xl border border-zinc-300 text-xs"
                    />
                    <textarea
                      rows={2}
                      value={blk.content_en}
                      onChange={(e) =>
                        setDetailBlocks((prev) =>
                          prev.map((item, i) =>
                            i === idx ? { ...item, content_en: e.target.value } : item
                          )
                        )
                      }
                      placeholder="Detailed Description (English, 선택사항)"
                      className="px-3 py-1.5 rounded-xl border border-zinc-300 text-xs"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    {blk.image && (
                      <img
                        src={blk.image}
                        alt=""
                        className="w-9 h-9 rounded-lg object-cover border"
                      />
                    )}
                    <input
                      type="text"
                      value={blk.image}
                      onChange={(e) =>
                        setDetailBlocks((prev) =>
                          prev.map((item, i) =>
                            i === idx ? { ...item, image: e.target.value } : item
                          )
                        )
                      }
                      placeholder="섹션 이미지 URL 또는 우측 사진 업로드"
                      className="flex-1 px-3 py-1.5 rounded-xl border border-zinc-300 text-xs"
                    />
                    <label className="cursor-pointer px-2.5 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-[11px] font-bold shrink-0 inline-flex items-center gap-1">
                      <Upload className="w-3 h-3" /> 사진 첨부
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleBlockImageUpload(idx, e)}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-2 border-t border-zinc-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-zinc-800">
                  📏 제품 규격 / 스펙 표 (선택)
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setSpecs((prev) => [...prev, { label: '', value: '' }])
                  }
                  className="inline-flex items-center gap-1 text-xs font-extrabold text-zinc-700 hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" /> 스펙 항목 추가
                </button>
              </div>
              {specs.map((sp, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    value={sp.label}
                    onChange={(e) =>
                      setSpecs((prev) =>
                        prev.map((item, i) =>
                          i === idx ? { ...item, label: e.target.value } : item
                        )
                      )
                    }
                    placeholder="항목명 (예: 소재 / 무게)"
                    className="w-2/5 px-3 py-1.5 rounded-xl border border-zinc-300 bg-white text-xs font-bold"
                  />
                  <input
                    type="text"
                    value={sp.value}
                    onChange={(e) =>
                      setSpecs((prev) =>
                        prev.map((item, i) =>
                          i === idx ? { ...item, value: e.target.value } : item
                        )
                      )
                    }
                    placeholder="내용 (예: Grade 1 Titanium / 1.85kg)"
                    className="flex-1 px-3 py-1.5 rounded-xl border border-zinc-300 bg-white text-xs"
                  />
                  {specs.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        setSpecs((prev) => prev.filter((_, i) => i !== idx))
                      }
                      className="px-2 text-zinc-400 hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3 p-4 rounded-2xl bg-white border border-zinc-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black text-zinc-900 flex items-center gap-1.5">
                <Languages className="w-4 h-4 text-indigo-600" />
                3. 한국어 & 해외 구매자용 영문(English) 상품 정보
              </h3>
              <button
                type="button"
                onClick={handleAiAutoFillAndTranslate}
                disabled={isAiGenerating}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-extrabold shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                AI 한·영 자동 번역 & 마케팅 문구 완성
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div>
                <label className="block text-[11px] font-bold text-zinc-600 mb-1">
                  영상/상품 번호 *
                </label>
                <input
                  type="number"
                  required
                  value={videoNumber}
                  onChange={(e) => setVideoNumber(e.target.value)}
                  placeholder="106"
                  className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-xs font-black"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-zinc-600 mb-1">
                  주요 유입 채널
                </label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-xs font-bold bg-white"
                >
                  <option value="instagram">Instagram (Reels)</option>
                  <option value="youtube">YouTube (Shorts)</option>
                  <option value="tiktok">TikTok</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-zinc-600 mb-1">
                  국내 판매가 (KRW 원)
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => handlePriceChange(e.target.value)}
                  placeholder="129000"
                  className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-xs font-bold"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-indigo-700 mb-1">
                  해외 판매가 (USD $)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={priceUsd}
                  onChange={(e) => setPriceUsd(e.target.value)}
                  placeholder="95"
                  className="w-full px-3 py-2 rounded-xl border border-indigo-300 bg-indigo-50/40 text-xs font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-bold text-zinc-600 mb-1">
                  한국어 상품명 *
                </label>
                <input
                  type="text"
                  required
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="예: 카시오페아 (L) 티타늄 화목난로"
                  className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-xs font-bold"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-indigo-700 mb-1">
                  영문 상품명 (English Product Name)
                </label>
                <input
                  type="text"
                  value={productNameEn}
                  onChange={(e) => setProductNameEn(e.target.value)}
                  placeholder="e.g. Cassiopeia (L) Titanium Wood Stove"
                  className="w-full px-3 py-2 rounded-xl border border-indigo-300 bg-indigo-50/30 text-xs font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-bold text-zinc-600 mb-1">
                  한국어 한 줄 설명
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="상품 핵심 요약 문구 (한국어)"
                  className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-indigo-700 mb-1">
                  영문 한 줄 설명 (English Subtitle)
                </label>
                <input
                  type="text"
                  value={descriptionEn}
                  onChange={(e) => setDescriptionEn(e.target.value)}
                  placeholder="Short product description in English"
                  className="w-full px-3 py-2 rounded-xl border border-indigo-300 bg-indigo-50/30 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-bold text-zinc-600 mb-1">
                  한국어 옵션 목록 (쉼표 구분)
                </label>
                <input
                  type="text"
                  value={optionsInput}
                  onChange={(e) => setOptionsInput(e.target.value)}
                  placeholder="예: 기본 단품, 풀세트 (+25,000원)"
                  className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-indigo-700 mb-1">
                  영문 옵션 목록 (English Options, 쉼표 구분)
                </label>
                <input
                  type="text"
                  value={optionsEnInput}
                  onChange={(e) => setOptionsEnInput(e.target.value)}
                  placeholder="e.g. Standard Set, Full Package (+$19)"
                  className="w-full px-3 py-2 rounded-xl border border-indigo-300 bg-indigo-50/30 text-xs"
                />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-300 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black text-amber-950 flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-amber-700" />
                4. 제3자 온라인 결제 폼 연동 (Stripe · PayPal · 포트원 · 토스 · 페이앱 등)
              </h3>
              <span className="text-[11px] font-bold text-amber-800">
                국내·해외 결제 링크 분리 가능
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <label className="block text-[11px] font-bold text-amber-900 mb-1">
                  결제 대행사 표시명
                </label>
                <input
                  type="text"
                  value={paymentProvider}
                  onChange={(e) => setPaymentProvider(e.target.value)}
                  placeholder="예: Stripe / PayPal / Toss"
                  className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-white text-xs font-bold"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-amber-900 mb-1">
                  국내(KR) 제3자 온라인 결제 폼 URL
                </label>
                <input
                  type="url"
                  value={thirdPartyPaymentUrl}
                  onChange={(e) => setThirdPartyPaymentUrl(e.target.value)}
                  placeholder="https://buy.stripe.com/... 또는 결제폼 링크"
                  className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-white text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-amber-900 mb-1">
                  해외(EN) 글로벌 결제 폼 URL (PayPal/Stripe 등)
                </label>
                <input
                  type="url"
                  value={thirdPartyPaymentUrlEn}
                  onChange={(e) => setThirdPartyPaymentUrlEn(e.target.value)}
                  placeholder="https://paypal.me/... (비워두면 국내 링크 공통 사용)"
                  className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-white text-xs"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-zinc-100 text-zinc-700 text-xs font-bold"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-extrabold shadow-md"
            >
              {editingItem ? '수정 내용 저장하기' : '독립 판매페이지 생성 완료'}
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
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans pb-20">
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-zinc-900 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-xl border border-zinc-700">
          {toastMessage}
        </div>
      )}

      {/* 상단 공통 헤더 */}
      <header className="bg-white/95 backdrop-blur-md border-b border-zinc-200 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button onClick={handleBackToStore} className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-zinc-900 text-amber-400 flex items-center justify-center font-black text-sm">
                #
              </span>
              <span className="font-black text-base tracking-tight">SHORTPICK</span>
            </button>

            {products.length > 0 && (
              <button
                onClick={() => {
                  const target = selectedShopProduct || products[0];
                  handleOpenDirectShop(target);
                }}
                className={`hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                  activeTab === 'shop'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>
                  {lang === 'en' ? 'Standalone Product Page' : '독립 판매페이지 보기'}
                </span>
              </button>
            )}
          </div>

          {/* 우측 언어 전환(KR/EN) & 관리자 전용 상품 등록 버튼 */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleToggleLang}
              className="inline-flex items-center gap-1 px-2.5 py-2 rounded-xl border border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-800 text-xs font-extrabold"
              title="한국어 / English 전환"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-600" />
              <span>{lang === 'en' ? 'EN ($)' : 'KR (₩)'}</span>
            </button>

            {!isAdmin ? (
              <button
                onClick={() => {
                  setPinInput('');
                  setPinError('');
                  setShowPinModal(true);
                }}
                className="inline-flex items-center gap-1 px-2.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-bold"
              >
                <Lock className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">
                  {lang === 'en' ? 'Admin' : '관리자'}
                </span>
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    setEditingItem(null);
                    setShowProductModal(true);
                  }}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs font-extrabold shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>{lang === 'en' ? 'Add Product' : '상품/직접등록'}</span>
                </button>
                <button
                  onClick={() =>
                    setActiveTab(activeTab === 'admin' ? 'store' : 'admin')
                  }
                  className={`inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold ${
                    activeTab === 'admin'
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>{activeTab === 'admin' ? '스토어' : '관리자 홈'}</span>
                </button>
                <button
                  onClick={() => {
                    setIsAdmin(false);
                    setShowProductModal(false);
                    if (activeTab === 'admin') setActiveTab('store');
                    showToast('🔒 관리자 모드가 잠겼습니다.');
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-2 rounded-xl bg-zinc-900 text-white text-xs font-bold"
                >
                  <Unlock className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* 현재 화면 렌더링 */}
      {activeTab === 'store' && (
        <StoreView
          products={products}
          lang={lang}
          isAdmin={isAdmin}
          onProductClick={handleProductClick}
          onOpenDirectShop={handleOpenDirectShop}
          onOpenManualCreate={() => {
            if (!isAdmin) return;
            setEditingItem(null);
            setShowProductModal(true);
          }}
          onEditProduct={(item) => {
            if (!isAdmin) return;
            setEditingItem(item);
            setShowProductModal(true);
          }}
          onDeleteProduct={(item) => {
            if (!isAdmin) return;
            setDeletingItem(item);
          }}
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
          onSaveBankAccount={(val) => {
            setBankAccountInfo(val);
            safeSetStorage('sf_bank_info', val);
            showToast('✅ 입금 계좌 안내 문구가 저장되었습니다.');
          }}
          onSaveThirdPartyDefaultUrl={(val) => {
            setThirdPartyDefaultUrl(val);
            safeSetStorage('sf_third_party_url', val);
            showToast('✅ 기본 제3자 온라인 결제 폼 URL이 저장되었습니다.');
          }}
          onConnectSupabase={async (e) => {
            e.preventDefault();
            const ok = await syncSupabase(sbUrl, sbKey);
            if (ok) {
              safeSetStorage('sf_supabase_url', sbUrl);
              safeSetStorage('sf_supabase_key', sbKey);
              showToast('✅ Supabase DB와 연결되었습니다!');
            } else {
              showToast('❌ 연결 실패: URL과 키를 확인해 주세요.');
            }
          }}
          onSyncSupabase={() => syncSupabase()}
          onChangePin={(newPin) => {
            if (newPin.trim().length < 4) return;
            setAdminPin(newPin.trim());
            safeSetStorage('sf_admin_pin', newPin.trim());
            showToast('✅ 관리자 PIN 비밀번호가 변경되었습니다.');
          }}
          onOpenNewProduct={() => {
            setEditingItem(null);
            setShowProductModal(true);
          }}
          onOpenDirectShop={handleOpenDirectShop}
          onEditProduct={(item) => {
            setEditingItem(item);
            setShowProductModal(true);
          }}
          onDeleteProduct={(item) => setDeletingItem(item)}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onLockAdmin={() => {
            setIsAdmin(false);
            setShowProductModal(false);
            setActiveTab('store');
            showToast('🔒 관리자 모드가 잠겼습니다.');
          }}
        />
      )}

      {/* 관리자 PIN 인증 모달 */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-zinc-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-black">관리자 인증</h3>
              <button
                onClick={() => setShowPinModal(false)}
                className="p-1.5 rounded-xl hover:bg-zinc-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (pinInput.trim() === adminPin) {
                  setIsAdmin(true);
                  setShowPinModal(false);
                  setActiveTab('admin');
                  showToast('🔓 관리자 모드가 잠금 해제되었습니다.');
                } else {
                  setPinError('비밀번호가 일치하지 않습니다. (초기값: 1234)');
                }
              }}
              className="space-y-3"
            >
              <input
                type="password"
                autoFocus
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="PIN 번호 입력 (초기값: 1234)"
                className="w-full px-4 py-3 rounded-2xl border-2 border-zinc-900 text-center text-base font-black tracking-widest"
              />
              {pinError && (
                <p className="text-xs font-bold text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {pinError}
                </p>
              )}
              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-zinc-900 text-white text-xs font-extrabold"
              >
                잠금 해제 및 진입
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 상품 삭제 확인 모달 */}
      {isAdmin && deletingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-zinc-200 space-y-4">
            <h3 className="text-base font-black text-zinc-900">상품 삭제 확인</h3>
            <p className="text-xs text-zinc-600">
              '[#{deletingItem.shortform_posts?.video_number || '-'}번] {deletingItem.name}' 상품을 삭제하시겠습니까?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeletingItem(null)}
                className="px-4 py-2 rounded-xl bg-zinc-100 text-zinc-700 text-xs font-bold"
              >
                취소
              </button>
              <button
                onClick={confirmDeleteProduct}
                className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-extrabold"
              >
                삭제하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 상품 등록/수정 모달 (관리자 전용: 3가지 방식 + 제3자 결제 + 한/영 지원) */}
      {isAdmin && showProductModal && (
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