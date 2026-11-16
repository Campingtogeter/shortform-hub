// src/lib/storeApi.js

export const INITIAL_PRODUCTS = [
  {
    id: 'item-104-a',
    post_id: 'post-104',
    item_code: '104-A',
    sale_type: 'direct', // 'direct': 자체 직접 판매 페이지 연결 | 'affiliate': 외부 링크 이동
    name: '초소형 맥세이프 3in1 접이식 고속 무선충전기',
    description: '아이폰·애플워치·에어팟 동시 충전! 여행용 파우치에 쏙 들어가는 초슬림 거치대',
    price: 34900,
    options: ['화이트 (단품)', '스페이스 블랙 (단품)', '화이트 2개 세트 (추가할인)'],
    image_url: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=700&q=80',
    purchase_url: 'https://www.coupang.com',
    badge_text: '릴스 공구 특가',
    click_count: 842,
    is_new: false,
    shortform_posts: {
      id: 'post-104',
      video_number: 104,
      platform: 'instagram',
      title: '책상 위 충전선 정리 한 번에 끝내는 데스크테리어 꿀템',
      video_url: 'https://www.instagram.com',
      ai_summary:
        '• 케이블 3개를 하나로 줄여주는 초슬림 접이식 디자인\n• 맥세이프 강력한 자력으로 가로·세로 거치 모두 안정적\n• 출장이나 해외여행 시 필수 휴대용 충전 스테이션으로 추천',
      tags: ['데스크테리어', '맥세이프충전기', '여행필수템', '릴스추천템'],
    },
  },
  {
    id: 'item-103-a',
    post_id: 'post-103',
    item_code: '103-A',
    sale_type: 'affiliate',
    name: '진공 단열 스텐 보온보냉 텀블러 900ml 손잡이형',
    description: '얼음이 24시간 동안 녹지 않는 대용량 차량용 컵홀더 호환 텀블러',
    price: 21500,
    options: [],
    image_url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=700&q=80',
    purchase_url: 'https://shopping.naver.com',
    badge_text: '틱톡 품절대란',
    click_count: 619,
    is_new: false,
    shortform_posts: {
      id: 'post-103',
      video_number: 103,
      platform: 'tiktok',
      title: '한여름 차 안에 두고 내렸는데 얼음이 그대로인 괴물 텀블러',
      video_url: 'https://www.tiktok.com',
      ai_summary:
        '• 이중 진공 스테인리스 구조로 결로 현상 없이 24시간 보냉 유지\n• 차량 컵홀더에 딱 맞는 하단 슬림 설계 및 튼튼한 손잡이 탑재\n• 입구가 넓어 세척이 간편하고 위생적인 사용 가능',
      tags: ['보냉텀블러', '차량용품', '틱톡핫템', '가성비추천'],
    },
  },
  {
    id: 'item-102-a',
    post_id: 'post-102',
    item_code: '102-A',
    sale_type: 'affiliate',
    name: '무선 전동 스핀 욕실 청소솔 5종 브러쉬 세트',
    description: '허리 숙일 필요 없이 물때·곰팡이 3분 컷! IPX7 완전 방수 전동 청소기',
    price: 28900,
    options: [],
    image_url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=700&q=80',
    purchase_url: 'https://www.coupang.com',
    badge_text: '쇼츠 85만뷰',
    click_count: 475,
    is_new: false,
    shortform_posts: {
      id: 'post-102',
      video_number: 102,
      platform: 'youtube',
      title: '화장실 줄눈 물때 락스 없이 3분 만에 새집처럼 만드는 법',
      video_url: 'https://www.youtube.com/shorts',
      ai_summary:
        '• 분당 350회 강력 회전으로 힘들이지 않고 욕실 타일 물때 제거\n• 틈새솔·평면솔·수세미 등 5가지 교체형 헤드 기본 제공\n• 길이 조절 연장봉 포함으로 천장부터 바닥까지 편하게 청소',
      tags: ['자취꿀템', '욕실청소', '살림노하우', '쇼츠추천'],
    },
  },
];

// Supabase 상품 목록 조회
export async function apiFetchProducts(sbUrl, sbKey) {
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
export async function apiCreateDirectOrder(sbUrl, sbKey, orderPayload) {
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
export async function apiFetchDirectOrders(sbUrl, sbKey) {
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

// Supabase 주문 상태 변경 (입금대기 -> 입금완료 -> 발송완료)
export async function apiUpdateOrderStatus(sbUrl, sbKey, orderId, orderStatus) {
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