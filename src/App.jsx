import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Music2,
  ExternalLink,
  Sparkles,
  Play,
  X,
  Plus,
  Lock,
  Unlock,
  ShieldCheck,
  BarChart3,
  Package,
  MousePointerClick,
  Wand2,
  Upload,
  Loader2,
  Trash2,
  Edit3,
  MessageSquare,
  Crown,
  Calendar,
  Database,
  KeyRound,
  Heart,
  Send,
  Download,
  Check,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';

// 최신 lucide-react 호환용 자체 SNS 아이콘 컴포넌트
const InstagramIcon = ({ className = 'w-3 h-3' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
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
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

// 초기 샘플 숏폼 상품 데이터 (Supabase 연결 전이나 초기 실행 시 표시)
const INITIAL_PRODUCTS = [
  {
    id: 'item-104-a',
    post_id: 'post-104',
    item_code: '104-A',
    name: '초소형 맥세이프 3in1 접이식 고속 무선충전기',
    description: '아이폰·애플워치·에어팟 동시 충전! 여행용 파우치에 쏙 들어가는 초슬림 거치대',
    price: 34900,
    image_url: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=700&q=80',
    purchase_url: 'https://www.coupang.com',
    badge_text: '릴스 120만뷰 돌파',
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
    name: '진공 단열 스텐 보온보냉 텀블러 900ml 손잡이형',
    description: '얼음이 24시간 동안 녹지 않는 대용량 차량용 컵홀더 호환 텀블러',
    price: 21500,
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
    name: '무선 전동 스핀 욕실 청소솔 5종 브러쉬 세트',
    description: '허리 숙일 필요 없이 물때·곰팡이 3분 컷! IPX7 완전 방수 전동 청소기',
    price: 28900,
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
  {
    id: 'item-101-a',
    post_id: 'post-101',
    item_code: '101-A',
    name: '미니 휴대용 진공 압축기 + 여행용 압축팩 6매 세트',
    description: '캐리어 공간 2배 확보! 겨울 패딩·니트 부피를 10초 만에 절반으로 압축',
    price: 18900,
    image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&q=80',
    purchase_url: 'https://ko.aliexpress.com',
    badge_text: '여행 필수템',
    click_count: 390,
    is_new: false,
    shortform_posts: {
      id: 'post-101',
      video_number: 101,
      platform: 'instagram',
      title: '기내용 캐리어 하나로 일주일 짐 다 챙기는 패킹 꿀팁',
      video_url: 'https://www.instagram.com',
      ai_summary:
        '• 손바닥만 한 초소형 무선 펌프로 10초 만에 자동 진공 압축 완료\n• C타입 충전 방식으로 보조배터리로도 언제든 충전 가능\n• 재사용 가능한 고강도 압축 파우치 6매 포함 구성',
      tags: ['여행패킹', '진공압축팩', '캐리어정리', '인스타공구'],
    },
  },
];

const INITIAL_COMMUNITY = [
  {
    id: 'c-1',
    category: 'hotdeal',
    author: '꿀템탐험가',
    title: '#104번 맥세이프 충전기 오늘 카드사 추가 할인 뜨네요!',
    content: '방금 링크 타고 들어가서 확인해 보니 와우회원 기준 3천원 쿠폰 적용됩니다. 여행 가실 분들 지금 사시면 좋을 듯해요.',
    likes: 24,
    comments: 6,
    createdAt: '2시간 전',
  },
  {
    id: 'c-2',
    category: 'review',
    author: '자취3년차',
    title: '#102번 전동 청소솔 2주 실사용 솔직 후기',
    content: '욕실 바닥 타일 줄눈 닦을 때 손목이 하나도 안 아파서 만족합니다. 다만 충전 단자 고무마개는 물 닿기 전에 꼭 꽉 닫으세요!',
    likes: 18,
    comments: 4,
    createdAt: '어제',
  },
  {
    id: 'c-3',
    category: 'qna',
    author: '모카라떼',
    title: '혹시 어제 릴스에 올라온 주방 기름때 제거제 번호 몇 번인가요?',
    content: '영상을 저장 못 했는데 번호 아시는 분 댓글 부탁드립니다!',
    likes: 5,
    comments: 2,
    createdAt: '2일 전',
  },
];

const INITIAL_RESOURCES = [
  {
    id: 'r-1',
    title: '2026 상반기 숏폼 100만뷰 돌파 생활꿀템 TOP 50 총정리 리스트 (PDF)',
    description: '인스타 릴스·틱톡에서 가장 반응이 뜨거웠던 카테고리별 베스트 상품 링크 & 최저가 비교표',
    tier: '무료 회원',
    fileSize: '4.2 MB',
    downloads: 1240,
  },
  {
    id: 'r-2',
    title: '해외여행·캠핑 짐 싸기 체크리스트 & 압축 파우치 활용 가이드',
    description: '기내용/위탁수하물 규정부터 계절별 패킹 노하우까지 한 장으로 정리한 체크시트',
    tier: '무료 회원',
    fileSize: '1.8 MB',
    downloads: 856,
  },
  {
    id: 'r-3',
    title: '[Pro 전용] 쿠팡·알리 제휴마케팅 고효율 숏폼 후킹 대본 30선 템플릿',
    description: '초반 3초 이탈을 막는 검증된 숏폼 오프닝 멘트와 상품 연결 CTA 문구 모음집',
    tier: 'Pro 구독자',
    fileSize: '6.5 MB',
    downloads: 312,
  },
];

// 차단 에러 문구 필터링 헬퍼
const isBlockedErrorString = (text = '') => {
  const blocked = ['에러페이지', '시스템오류', '접속이 불가', '비정상적인 접근', 'access denied'];
  const lower = String(text).toLowerCase();
  return blocked.some((kw) => lower.includes(kw));
};

export default function App() {
  // 환경변수에서 Supabase 키 및 기본 관리자 PIN 안전하게 읽기
  const envSupabaseUrl =
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) || '';
  const envSupabaseKey =
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) || '';
  const envAdminPin =
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_ADMIN_PIN) || '';

  // 네비게이션 및 뷰 상태 ('store' | 'community' | 'resources' | 'pricing' | 'admin')
  const [activeTab, setActiveTab] = useState('store');

  // 관리자 PIN 인증 및 잠금 상태 (Supabase admin_settings 테이블과 실시간 동기화)
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPin, setAdminPin] = useState(() => {
    if (envAdminPin) return String(envAdminPin).trim();
    try {
      return localStorage.getItem('sf_admin_pin') || '1234';
    } catch {
      return '1234';
    }
  });
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [newPinInput, setNewPinInput] = useState('');
  const [isVerifyingPin, setIsVerifyingPin] = useState(false);

  // Supabase 실시간 DB 연동 상태
  const [sbUrl, setSbUrl] = useState(() => {
    try {
      return envSupabaseUrl || localStorage.getItem('sf_supabase_url') || '';
    } catch {
      return envSupabaseUrl;
    }
  });
  const [sbKey, setSbKey] = useState(() => {
    try {
      return envSupabaseKey || localStorage.getItem('sf_supabase_key') || '';
    } catch {
      return envSupabaseKey;
    }
  });
  const [dbConnected, setDbConnected] = useState(Boolean(envSupabaseUrl && envSupabaseKey));
  const [isSyncingDb, setIsSyncingDb] = useState(false);

  // 상품 목록 및 검색·필터 상태
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('sf_products_v2');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [expandedSummaryId, setExpandedSummaryId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // 새 숏폼 & 상품 등록/수정 모달 상태
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // 폼 입력 상태 (STEP 1: 숏폼 영상 정보)
  const [videoNumber, setVideoNumber] = useState('');
  const [platform, setPlatform] = useState('instagram');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');

  // 폼 입력 상태 (STEP 2: 1:N 상품 리스트)
  const [formItems, setFormItems] = useState([
    {
      purchaseUrl: '',
      name: '',
      price: '',
      imageUrl: '',
      badgeText: '',
      description: '',
    },
  ]);
  const [aiSummary, setAiSummary] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [scrapingIdx, setScrapingIdx] = useState(null);
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [isSavingProduct, setIsSavingProduct] = useState(false);

  // 커뮤니티 & 예약 상태
  const [communityPosts, setCommunityPosts] = useState(INITIAL_COMMUNITY);
  const [communityCategory, setCommunityCategory] = useState('all');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCat, setNewPostCat] = useState('hotdeal');
  const [bookingName, setBookingName] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTopic, setBookingTopic] = useState('1:1 숏폼 커머스 수익화 컨설팅');

  // 토스트 알림 헬퍼
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // 로컬스토리지 자동 백업
  useEffect(() => {
    try {
      localStorage.setItem('sf_products_v2', JSON.stringify(products));
    } catch {
      // ignore storage quota errors
    }
  }, [products]);

  // Supabase에서 공용 관리자 PIN 불러오기
  const fetchGlobalAdminPin = async (url = sbUrl, key = sbKey) => {
    if (!url || !key) return null;
    try {
      const cleanUrl = url.replace(/\/$/, '');
      const res = await fetch(
        `${cleanUrl}/rest/v1/admin_settings?id=eq.main&select=admin_pin`,
        {
          headers: {
            apikey: key,
            Authorization: `Bearer ${key}`,
          },
        }
      );
      if (!res.ok) return null;
      const rows = await res.json();
      if (Array.isArray(rows) && rows[0]?.admin_pin) {
        const remotePin = String(rows[0].admin_pin).trim();
        setAdminPin(remotePin);
        try {
          localStorage.setItem('sf_admin_pin', remotePin);
        } catch {
          // ignore
        }
        return remotePin;
      }
    } catch {
      // admin_settings 테이블 미생성 시 기존 PIN 유지
    }
    return null;
  };

  // Supabase에서 실시간 상품 목록 불러오기
  const fetchFromSupabase = async (url = sbUrl, key = sbKey) => {
    if (!url || !key) return false;
    setIsSyncingDb(true);
    try {
      const cleanUrl = url.replace(/\/$/, '');
      const res = await fetch(
        `${cleanUrl}/rest/v1/product_items?select=*,shortform_posts(*)&is_active=eq.true&order=created_at.desc`,
        {
          headers: {
            apikey: key,
            Authorization: `Bearer ${key}`,
          },
        }
      );
      if (!res.ok) throw new Error('Supabase 테이블 조회 실패');
      const data = await res.json();
      setDbConnected(true);
      if (Array.isArray(data) && data.length > 0) {
        setProducts(data);
      }
      await fetchGlobalAdminPin(url, key);
      return true;
    } catch (err) {
      console.error(err);
      setDbConnected(false);
      return false;
    } finally {
      setIsSyncingDb(false);
    }
  };

  // 앱 시작 시 Supabase 연결 정보가 있으면 상품 목록과 공용 PIN을 자동 동기화
  useEffect(() => {
    if (sbUrl && sbKey) {
      fetchFromSupabase(sbUrl, sbKey);
    }
  }, []);

  // 다음 추천 영상 번호 계산
  const getNextVideoNumber = () => {
    const maxNum = products.reduce((max, item) => {
      const num = Number(item.shortform_posts?.video_number || 0);
      return num > max ? num : max;
    }, 104);
    return String(maxNum + 1);
  };

  // 관리자 PIN 인증 처리 (검증 직전 DB의 최신 PIN을 먼저 조회)
  const handleVerifyPin = async (e) => {
    e.preventDefault();
    setIsVerifyingPin(true);
    try {
      let currentValidPin = adminPin;
      if (sbUrl && sbKey) {
        const remotePin = await fetchGlobalAdminPin(sbUrl, sbKey);
        if (remotePin) {
          currentValidPin = remotePin;
        }
      }

      if (pinInput.trim() === currentValidPin) {
        setIsAdmin(true);
        setShowPinModal(false);
        setPinInput('');
        setPinError('');
        setActiveTab('admin');
        showToast('🔓 관리자 모드가 잠금 해제되었습니다.');
      } else {
        setPinError('비밀번호가 일치하지 않습니다.');
      }
    } finally {
      setIsVerifyingPin(false);
    }
  };

  // 관리자 잠금 처리 (잠금 시 메인 스토어로 즉시 복귀)
  const handleLockAdmin = () => {
    setIsAdmin(false);
    if (activeTab === 'admin') {
      setActiveTab('store');
    }
    showToast('🔒 관리자 모드가 잠겼습니다.');
  };

  // 새 관리자 PIN 변경 (모든 기기에 즉시 반영되도록 Supabase DB에 저장)
  const handleChangePin = async (e) => {
    e.preventDefault();
    const nextPin = newPinInput.trim();
    if (nextPin.length < 4) {
      showToast('⚠️ PIN 번호는 최소 4자리 이상 입력해 주세요.');
      return;
    }
    setAdminPin(nextPin);
    try {
      localStorage.setItem('sf_admin_pin', nextPin);
    } catch {
      // ignore
    }

    if (dbConnected && sbUrl && sbKey) {
      try {
        const cleanUrl = sbUrl.replace(/\/$/, '');
        const res = await fetch(`${cleanUrl}/rest/v1/admin_settings`, {
          method: 'POST',
          headers: {
            apikey: sbKey,
            Authorization: `Bearer ${sbKey}`,
            'Content-Type': 'application/json',
            Prefer: 'resolution=merge-duplicates',
          },
          body: JSON.stringify({
            id: 'main',
            admin_pin: nextPin,
            updated_at: new Date().toISOString(),
          }),
        });
        if (res.ok) {
          setNewPinInput('');
          showToast('✅ 새 관리자 PIN이 모든 기기(DB)에 실시간 반영되었습니다!');
          return;
        }
      } catch {
        // ignore
      }
    }

    setNewPinInput('');
    showToast('✅ 새 관리자 PIN 번호가 저장되었습니다.');
  };

  // Supabase DB 수동 연결 저장
  const handleConnectSupabase = async (e) => {
    e.preventDefault();
    if (!sbUrl.trim() || !sbKey.trim()) {
      showToast('⚠️ Supabase URL과 Anon Key를 모두 입력해 주세요.');
      return;
    }
    const ok = await fetchFromSupabase(sbUrl.trim(), sbKey.trim());
    if (ok) {
      try {
        localStorage.setItem('sf_supabase_url', sbUrl.trim());
        localStorage.setItem('sf_supabase_key', sbKey.trim());
      } catch {
        // ignore
      }
      showToast('✅ Supabase 실시간 데이터베이스와 연결되었습니다!');
    } else {
      showToast('❌ 연결에 실패했습니다. URL과 Anon Key, SQL 테이블 생성 여부를 확인하세요.');
    }
  };

  // 숏폼 URL 붙여넣기 시 플랫폼 자동 감지 & 유튜브 썸네일 추출
  const handleVideoUrlChange = (url) => {
    setVideoUrl(url);
    const lower = url.toLowerCase();
    if (lower.includes('instagram.com')) {
      setPlatform('instagram');
    } else if (lower.includes('tiktok.com')) {
      setPlatform('tiktok');
    } else if (lower.includes('youtube.com') || lower.includes('youtu.be')) {
      setPlatform('youtube');
      const ytMatch = url.match(/(?:shorts\/|v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
      if (ytMatch?.[1] && !formItems[0]?.imageUrl) {
        const thumb = `https://i.ytimg.com/vi/${ytMatch[1]}/hqdefault.jpg`;
        setFormItems((prev) =>
          prev.map((it, idx) => (idx === 0 && !it.imageUrl ? { ...it, imageUrl: thumb } : it))
        );
      }
    }
  };

  // 한국 서버(Vercel Seoul 리전) 우선 호출 + 폴백 상품 정보 자동 추출
  const handleScrapeProductUrl = async (index, targetUrl) => {
    const url = (targetUrl ?? formItems[index]?.purchaseUrl ?? '').trim();
    if (!url || !url.startsWith('http')) {
      showToast('⚠️ 올바른 상품 구매 링크(https://...)를 먼저 입력해 주세요.');
      return;
    }

    setScrapingIdx(index);
    try {
      let extracted = null;

      try {
        const localApiRes = await fetch(`/api/scrape?url=${encodeURIComponent(url)}`);
        if (localApiRes.ok) {
          const localJson = await localApiRes.json();
          if (localJson.ok && localJson.data?.title) {
            extracted = localJson.data;
          } else if (localJson.blocked) {
            showToast(`ℹ️ ${localJson.message}`);
            setScrapingIdx(null);
            return;
          }
        }
      } catch {
        // 로컬 개발환경 등에서는 2순위 API로 폴백
      }

      if (!extracted) {
        const res = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}`);
        const json = await res.json();
        if (json.status === 'success' && json.data) {
          const rawTitle = json.data.title || '';
          if (isBlockedErrorString(rawTitle) || /^\d+$/.test(rawTitle.trim())) {
            showToast('ℹ️ 보안 차단된 쇼핑몰 링크입니다. 상품명과 가격을 직접 입력해 주세요.');
            setScrapingIdx(null);
            return;
          }
          const cleanTitle = rawTitle
            .replace(
              /\s*[-|:!]\s*(쿠팡|Coupang|네이버\s*쇼핑|스마트스토어|AliExpress|알리익스프레스|오늘의집).*$/i,
              ''
            )
            .trim();
          const rawDesc = isBlockedErrorString(json.data.description) ? '' : json.data.description || '';
          const priceMatch = rawDesc.match(/([0-9]{1,3}(?:,[0-9]{3})+)\s*원/);
          extracted = {
            title: cleanTitle,
            image: json.data.image?.url || '',
            description: rawDesc,
            price: priceMatch ? priceMatch[1].replace(/,/g, '') : '',
          };
        }
      }

      if (
        extracted &&
        extracted.title &&
        !isBlockedErrorString(extracted.title) &&
        !/^\d+$/.test(extracted.title.trim())
      ) {
        setFormItems((prev) =>
          prev.map((item, idx) =>
            idx === index
              ? {
                  ...item,
                  purchaseUrl: url,
                  name: extracted.title || item.name,
                  imageUrl: extracted.image || item.imageUrl,
                  description: extracted.description || item.description,
                  price: extracted.price || item.price,
                }
              : item
          )
        );
        showToast('🔗 상품명·이미지·가격 정보를 불러왔습니다!');
      } else {
        showToast('ℹ️ 정보를 자동으로 읽지 못했습니다. 상품명을 직접 입력해 주세요.');
      }
    } catch {
      showToast('ℹ️ 보안 차단된 쇼핑몰 링크입니다. 상품명과 이미지를 직접 입력해 주세요.');
    } finally {
      setScrapingIdx(null);
    }
  };

  // 내 PC/스마트폰 이미지 파일 업로드 처리
  const handleLocalImageUpload = async (index, file) => {
    if (!file) return;

    if (dbConnected && sbUrl && sbKey) {
      try {
        const cleanUrl = sbUrl.replace(/\/$/, '');
        const ext = file.name.split('.').pop();
        const fileName = `item-${Date.now()}-${index}.${ext}`;
        const uploadRes = await fetch(`${cleanUrl}/storage/v1/object/public-media/${fileName}`, {
          method: 'POST',
          headers: {
            apikey: sbKey,
            Authorization: `Bearer ${sbKey}`,
            'Content-Type': file.type,
          },
          body: file,
        });
        if (uploadRes.ok) {
          const publicUrl = `${cleanUrl}/storage/v1/object/public/public-media/${fileName}`;
          setFormItems((prev) =>
            prev.map((it, i) => (i === index ? { ...it, imageUrl: publicUrl } : it))
          );
          showToast('📸 이미지가 Supabase 스토리지에 업로드되었습니다.');
          return;
        }
      } catch {
        // 실패 시 로컬 미리보기로 폴백
      }
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFormItems((prev) =>
        prev.map((it, i) => (i === index ? { ...it, imageUrl: reader.result } : it))
      );
      showToast('📸 선택한 사진이 상품 썸네일로 적용되었습니다.');
    };
    reader.readAsDataURL(file);
  };

  // AI 마케팅 문구(영상 제목·배지·3줄 요약·해시태그) 자동 완성
  const handleAiAutoFill = () => {
    const firstItem = formItems[0];
    if (!firstItem?.name?.trim()) {
      showToast('⚠️ 먼저 첫 번째 상품명을 입력하거나 링크 자동 추출을 실행해 주세요.');
      return;
    }

    setIsAiGenerating(true);
    setTimeout(() => {
      const pName = firstItem.name.trim();
      const platformLabel =
        platform === 'instagram' ? '릴스' : platform === 'tiktok' ? '틱톡' : '쇼츠';

      if (!videoTitle.trim()) {
        setVideoTitle(`요즘 ${platformLabel}에서 난리 난 '${pName.slice(0, 18)}' 실사용 후기`);
      }

      setFormItems((prev) =>
        prev.map((it, idx) => ({
          ...it,
          badgeText: it.badgeText || (idx === 0 ? `${platformLabel} 화제템` : '함께 쓰면 꿀조합'),
          description:
            it.description ||
            `${it.name} — 실용성과 가성비를 모두 잡은 크리에이터 강력 추천 아이템`,
        }))
      );

      setAiSummary(
        `• ${pName}의 핵심 기능을 일상에서 가장 편하게 활용할 수 있는 구성\n• 불필요한 과정을 줄여 시간과 비용을 동시에 아껴주는 실속형 추천템\n• 현재 온라인 최저가 혜택 및 빠른 배송으로 만나볼 수 있는 인기 상품`
      );

      const cleanWords = pName
        .split(/\s+/)
        .filter((w) => w.length >= 2)
        .slice(0, 3);
      setTagsInput([...cleanWords, `${platformLabel}추천템`, '가성비꿀템'].join(', '));

      setIsAiGenerating(false);
      showToast('✨ AI가 숏폼 제목, 배지 문구, 3줄 요약을 자동 완성했습니다!');
    }, 550);
  };

  // 신규 등록 모달 열기
  const openNewProductModal = () => {
    setEditingItem(null);
    setVideoNumber(getNextVideoNumber());
    setPlatform('instagram');
    setVideoUrl('');
    setVideoTitle('');
    setFormItems([
      {
        purchaseUrl: '',
        name: '',
        price: '',
        imageUrl: '',
        badgeText: '',
        description: '',
      },
    ]);
    setAiSummary('');
    setTagsInput('');
    setShowProductModal(true);
  };

  // 기존 상품 수정 모달 열기
  const openEditProductModal = (item) => {
    setEditingItem(item);
    setVideoNumber(String(item.shortform_posts?.video_number || ''));
    setPlatform(item.shortform_posts?.platform || 'instagram');
    setVideoUrl(item.shortform_posts?.video_url || '');
    setVideoTitle(item.shortform_posts?.title || '');
    setFormItems([
      {
        purchaseUrl: item.purchase_url || '',
        name: item.name || '',
        price: item.price ? String(item.price) : '',
        imageUrl: item.image_url || '',
        badgeText: item.badge_text || '',
        description: item.description || '',
      },
    ]);
    setAiSummary(item.shortform_posts?.ai_summary || '');
    setTagsInput((item.shortform_posts?.tags || []).join(', '));
    setShowProductModal(true);
  };

  // 숏폼 & 상품 최종 저장 (신규 등록 및 수정)
  const handleSaveProducts = async (e) => {
    e.preventDefault();
    if (!videoNumber.trim()) {
      showToast('⚠️ 숏폼 영상 번호를 입력해 주세요.');
      return;
    }
    const validItems = formItems.filter((it) => it.name.trim() && it.purchaseUrl.trim());
    if (validItems.length === 0) {
      showToast('⚠️ 최소 1개 이상의 상품명과 구매 링크를 입력해 주세요.');
      return;
    }

    setIsSavingProduct(true);
    const parsedTags = tagsInput
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    try {
      if (editingItem) {
        const target = validItems[0];
        if (dbConnected && sbUrl && sbKey && !String(editingItem.id).startsWith('item-')) {
          const cleanUrl = sbUrl.replace(/\/$/, '');
          await fetch(`${cleanUrl}/rest/v1/product_items?id=eq.${editingItem.id}`, {
            method: 'PATCH',
            headers: {
              apikey: sbKey,
              Authorization: `Bearer ${sbKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: target.name.trim(),
              description: target.description.trim(),
              price: Number(target.price) || 0,
              image_url: target.imageUrl.trim() || null,
              purchase_url: target.purchaseUrl.trim(),
              badge_text: target.badgeText.trim() || null,
            }),
          });
          if (editingItem.post_id) {
            await fetch(`${cleanUrl}/rest/v1/shortform_posts?id=eq.${editingItem.post_id}`, {
              method: 'PATCH',
              headers: {
                apikey: sbKey,
                Authorization: `Bearer ${sbKey}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                video_number: Number(videoNumber),
                platform,
                title: videoTitle.trim() || `${target.name} 추천`,
                video_url: videoUrl.trim() || null,
                ai_summary: aiSummary.trim() || null,
                tags: parsedTags,
              }),
            });
          }
          await fetchFromSupabase();
        } else {
          setProducts((prev) =>
            prev.map((p) =>
              p.id === editingItem.id
                ? {
                    ...p,
                    name: target.name.trim(),
                    description: target.description.trim(),
                    price: Number(target.price) || 0,
                    image_url: target.imageUrl.trim() || p.image_url,
                    purchase_url: target.purchaseUrl.trim(),
                    badge_text: target.badgeText.trim() || null,
                    shortform_posts: {
                      ...p.shortform_posts,
                      video_number: Number(videoNumber),
                      platform,
                      title: videoTitle.trim() || `${target.name} 추천`,
                      video_url: videoUrl.trim() || null,
                      ai_summary: aiSummary.trim() || null,
                      tags: parsedTags,
                    },
                  }
                : p
            )
          );
        }
        showToast('✅ 상품 정보가 수정되었습니다.');
      } else {
        if (dbConnected && sbUrl && sbKey) {
          const cleanUrl = sbUrl.replace(/\/$/, '');
          const postRes = await fetch(`${cleanUrl}/rest/v1/shortform_posts`, {
            method: 'POST',
            headers: {
              apikey: sbKey,
              Authorization: `Bearer ${sbKey}`,
              'Content-Type': 'application/json',
              Prefer: 'return=representation',
            },
            body: JSON.stringify({
              video_number: Number(videoNumber),
              platform,
              title: videoTitle.trim() || `${validItems[0].name} 추천 영상`,
              slug: `post-${videoNumber}-${Date.now()}`,
              video_url: videoUrl.trim() || null,
              thumbnail_url: validItems[0].imageUrl.trim() || null,
              ai_summary: aiSummary.trim() || null,
              tags: parsedTags,
            }),
          });
          const createdPosts = await postRes.json();
          const newPostId = createdPosts?.[0]?.id;

          if (newPostId) {
            const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const rowsToInsert = validItems.map((it, idx) => ({
              post_id: newPostId,
              item_code: `${videoNumber}-${alphabet[idx] || idx + 1}`,
              name: it.name.trim(),
              description: it.description.trim() || null,
              price: Number(it.price) || 0,
              image_url: it.imageUrl.trim() || null,
              purchase_url: it.purchaseUrl.trim(),
              badge_text: it.badgeText.trim() || null,
              is_active: true,
            }));

            await fetch(`${cleanUrl}/rest/v1/product_items`, {
              method: 'POST',
              headers: {
                apikey: sbKey,
                Authorization: `Bearer ${sbKey}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(rowsToInsert),
            });
            await fetchFromSupabase();
          }
        } else {
          const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
          const postId = `post-${Date.now()}`;
          const newEntries = validItems.map((it, idx) => ({
            id: `local-${Date.now()}-${idx}`,
            post_id: postId,
            item_code: `${videoNumber}-${alphabet[idx] || idx + 1}`,
            name: it.name.trim(),
            description: it.description.trim(),
            price: Number(it.price) || 0,
            image_url:
              it.imageUrl.trim() ||
              'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&q=80',
            purchase_url: it.purchaseUrl.trim(),
            badge_text: it.badgeText.trim() || '신규 등록',
            click_count: 0,
            is_new: true,
            shortform_posts: {
              id: postId,
              video_number: Number(videoNumber),
              platform,
              title: videoTitle.trim() || `${it.name} 추천 영상`,
              video_url: videoUrl.trim() || null,
              ai_summary: aiSummary.trim() || null,
              tags: parsedTags,
            },
          }));
          setProducts((prev) => [...newEntries, ...prev]);
        }
        showToast(`🎉 #${videoNumber}번 영상에 ${validItems.length}개 상품이 등록되었습니다!`);
      }

      setShowProductModal(false);
    } catch (err) {
      console.error(err);
      showToast('❌ 저장 중 오류가 발생했습니다. 입력 내용을 확인해 주세요.');
    } finally {
      setIsSavingProduct(false);
    }
  };

  // 상품 삭제
  const handleDeleteProduct = async (item) => {
    if (!window.confirm(`'[#${item.shortform_posts?.video_number || '-'}번] ${item.name}' 상품을 삭제하시겠습니까?`)) {
      return;
    }
    if (dbConnected && sbUrl && sbKey && !String(item.id).startsWith('item-') && !String(item.id).startsWith('local-')) {
      const cleanUrl = sbUrl.replace(/\/$/, '');
      await fetch(`${cleanUrl}/rest/v1/product_items?id=eq.${item.id}`, {
        method: 'DELETE',
        headers: {
          apikey: sbKey,
          Authorization: `Bearer ${sbKey}`,
        },
      });
      await fetchFromSupabase();
    } else {
      setProducts((prev) => prev.filter((p) => p.id !== item.id));
    }
    showToast('🗑️ 상품이 삭제되었습니다.');
  };

  // 구매 링크 클릭 로그 기록 및 이동
  const handleProductClick = async (item) => {
    const nextCount = (item.click_count || 0) + 1;
    setProducts((prev) =>
      prev.map((p) => (p.id === item.id ? { ...p, click_count: nextCount } : p))
    );

    if (dbConnected && sbUrl && sbKey && !String(item.id).startsWith('item-') && !String(item.id).startsWith('local-')) {
      const cleanUrl = sbUrl.replace(/\/$/, '');
      Promise.allSettled([
        fetch(`${cleanUrl}/rest/v1/click_logs`, {
          method: 'POST',
          headers: {
            apikey: sbKey,
            Authorization: `Bearer ${sbKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            product_id: item.id,
            referrer_platform: item.shortform_posts?.platform || 'direct',
            user_agent: navigator.userAgent,
          }),
        }),
        fetch(`${cleanUrl}/rest/v1/product_items?id=eq.${item.id}`, {
          method: 'PATCH',
          headers: {
            apikey: sbKey,
            Authorization: `Bearer ${sbKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ click_count: nextCount }),
        }),
      ]);
    }
  };

  // 실시간 검색어 + 플랫폼 필터링
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const post = item.shortform_posts;
      const platformOk = selectedPlatform === 'all' || post?.platform === selectedPlatform;
      const q = searchQuery.trim().toLowerCase();
      if (!q) return platformOk;

      const cleanNum = q.replace(/^#/, '');
      const vNum = String(post?.video_number || '');
      const iCode = (item.item_code || '').toLowerCase();
      const name = (item.name || '').toLowerCase();
      const title = (post?.title || '').toLowerCase();
      const tags = (post?.tags || []).join(' ').toLowerCase();

      return (
        platformOk &&
        (vNum.includes(cleanNum) ||
          iCode.includes(q) ||
          name.includes(q) ||
          title.includes(q) ||
          tags.includes(q))
      );
    });
  }, [products, searchQuery, selectedPlatform]);

  // 총 클릭 수 통계
  const totalClicks = useMemo(
    () => products.reduce((sum, item) => sum + (item.click_count || 0), 0),
    [products]
  );

  // 플랫폼 배지 렌더링
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
            추천템
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans pb-24">
      {/* 상단 알림 토스트 */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-zinc-900 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-xl border border-zinc-700 flex items-center gap-2 animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* 상단 글로벌 네비게이션 바 */}
      <header className="bg-white/95 backdrop-blur-md border-b border-zinc-200 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-2">
          {/* 좌측 로고 및 일반 방문자용 메뉴 */}
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('store')}
              className="flex items-center gap-1.5 mr-2 shrink-0"
            >
              <span className="w-8 h-8 rounded-xl bg-zinc-900 text-amber-400 flex items-center justify-center font-black text-sm">
                #
              </span>
              <span className="font-black text-base tracking-tight hidden sm:inline">
                SHORTPICK
              </span>
            </button>

            {[
              { id: 'store', label: '메인 스토어' },
              { id: 'community', label: '커뮤니티' },
              { id: 'resources', label: '자료실' },
              { id: 'pricing', label: '구독·예약' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-zinc-900 text-white'
                    : 'text-zinc-600 hover:bg-zinc-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 우측 통합 관리자 컨트롤 영역 */}
          <div className="flex items-center gap-1.5 shrink-0">
            {!isAdmin ? (
              <button
                onClick={() => {
                  setPinInput('');
                  setPinError('');
                  setShowPinModal(true);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-bold transition-colors"
                title="관리자 로그인"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>관리자</span>
              </button>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setActiveTab(activeTab === 'admin' ? 'store' : 'admin')}
                  className={`inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'admin'
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>{activeTab === 'admin' ? '스토어 보기' : '관리자 홈'}</span>
                </button>

                <button
                  onClick={openNewProductModal}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs font-extrabold shadow-sm transition-all"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span className="hidden sm:inline">상품 등록</span>
                </button>

                <button
                  onClick={handleLockAdmin}
                  className="inline-flex items-center gap-1 px-2.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold transition-colors"
                  title="관리자 모드 잠그기"
                >
                  <Unlock className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden md:inline">잠금</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* =====================================================================
          TAB 1: 메인 스토어 (숏폼 영상 번호 검색 & 상품 카드 그리드)
      ===================================================================== */}
      {activeTab === 'store' && (
        <main className="max-w-3xl mx-auto px-4 pt-6">
          <div className="text-center mb-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 text-white text-[11px] font-bold mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              릴스 · 틱톡 · 쇼츠 화제의 추천템 모음
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900">
              영상에서 본 그 상품 찾기
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
              영상 댓글에 안내된 <strong className="text-zinc-900">#영상번호</strong>를 검색하면 구매 링크로 바로 이동합니다.
            </p>
          </div>

          {/* 실시간 번호 검색바 & 플랫폼 필터 */}
          <div className="sticky top-16 z-30 bg-zinc-50/95 backdrop-blur-md py-3">
            <div className="relative">
              <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="영상 번호(예: 104) 또는 상품명·키워드 입력..."
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
                  { id: 'all', label: '전체 보기' },
                  { id: 'instagram', label: '인스타 릴스' },
                  { id: 'tiktok', label: '틱톡' },
                  { id: 'youtube', label: '유튜브 쇼츠' },
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
                총 <span className="text-zinc-900">{filteredProducts.length}</span>개
              </span>
            </div>
          </div>

          {/* 상품 카드 그리드 */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-zinc-200 mt-4">
              <p className="text-base font-extrabold text-zinc-800">
                일치하는 영상 번호나 상품이 없습니다.
              </p>
              <p className="text-xs text-zinc-400 mt-1">
                영상에 안내된 번호(예: 104)를 다시 확인해 보세요!
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedPlatform('all');
                }}
                className="mt-4 px-4 py-2 bg-zinc-900 text-white text-xs font-bold rounded-xl"
              >
                전체 상품 보기
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              {filteredProducts.map((item) => {
                const post = item.shortform_posts;
                const isSummaryOpen = expandedSummaryId === item.id;

                return (
                  <article
                    key={item.id}
                    className="bg-white rounded-3xl border border-zinc-200/90 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-[4/3] bg-zinc-100 overflow-hidden">
                        <img
                          src={
                            item.image_url ||
                            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&q=80'
                          }
                          alt={item.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />

                        <div className="absolute top-3 left-3 flex items-center gap-1.5">
                          <span className="bg-zinc-950/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-xl text-xs font-black shadow">
                            #{post?.video_number || '-'}번
                          </span>
                          {item.is_new && (
                            <span className="bg-blue-600 text-white px-2 py-1 rounded-xl text-[10px] font-black shadow">
                              NEW
                            </span>
                          )}
                        </div>

                        <div className="absolute top-3 right-3">
                          {renderPlatformBadge(post?.platform)}
                        </div>

                        {item.badge_text && (
                          <div className="absolute bottom-2.5 left-3">
                            <span className="inline-flex items-center gap-1 bg-amber-400 text-zinc-950 text-[11px] font-extrabold px-2.5 py-1 rounded-lg shadow">
                              <Sparkles className="w-3 h-3 fill-zinc-950" />
                              {item.badge_text}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="p-4">
                        {post?.title && (
                          <p className="text-[11px] font-semibold text-zinc-400 line-clamp-1 mb-1">
                            🎬 {post.title}
                          </p>
                        )}
                        <h2 className="text-base font-extrabold text-zinc-900 leading-snug">
                          {item.name}
                        </h2>
                        {item.description && (
                          <p className="text-xs text-zinc-500 mt-1 line-clamp-2">
                            {item.description}
                          </p>
                        )}

                        <div className="flex items-center justify-between mt-3">
                          {item.price > 0 ? (
                            <span className="text-base font-black text-zinc-900">
                              {Number(item.price).toLocaleString()}원
                            </span>
                          ) : (
                            <span className="text-xs font-bold text-zinc-400">
                              링크에서 가격 확인
                            </span>
                          )}

                          {post?.ai_summary && (
                            <button
                              onClick={() =>
                                setExpandedSummaryId(isSummaryOpen ? null : item.id)
                              }
                              className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-lg transition-colors"
                            >
                              <Sparkles className="w-3 h-3" />
                              {isSummaryOpen ? '요약 닫기' : 'AI 3줄 요약'}
                            </button>
                          )}
                        </div>

                        {isSummaryOpen && post?.ai_summary && (
                          <div className="mt-3 p-3 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-xs text-zinc-700 whitespace-pre-line leading-relaxed">
                            {post.ai_summary}
                          </div>
                        )}

                        {Array.isArray(post?.tags) && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-3">
                            {post.tags.map((tag, idx) => (
                              <button
                                key={idx}
                                onClick={() => setSearchQuery(tag)}
                                className="text-[11px] text-zinc-500 bg-zinc-100 hover:bg-zinc-200 px-2 py-0.5 rounded-md font-medium"
                              >
                                #{tag}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="px-4 pb-4 pt-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <a
                          href={item.purchase_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => handleProductClick(item)}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 px-4 bg-zinc-900 hover:bg-zinc-800 active:scale-[0.99] text-white text-xs font-extrabold rounded-2xl transition-all shadow-sm"
                        >
                          구매하러 가기
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>

                        {post?.video_url && (
                          <a
                            href={post.video_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="원본 숏폼 영상 보기"
                            className="p-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-2xl transition-colors"
                          >
                            <Play className="w-4 h-4 fill-current" />
                          </a>
                        )}
                      </div>

                      {isAdmin && (
                        <div className="flex items-center justify-end gap-1.5 pt-1 border-t border-zinc-100">
                          <span className="text-[10px] font-bold text-blue-600 mr-auto">
                            클릭 {item.click_count || 0}회
                          </span>
                          <button
                            onClick={() => openEditProductModal(item)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-[11px] font-bold"
                          >
                            <Edit3 className="w-3 h-3" /> 수정
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(item)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-[11px] font-bold"
                          >
                            <Trash2 className="w-3 h-3" /> 삭제
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
      )}

      {/* =====================================================================
          TAB 2: 통합 관리자 제어 센터
      ===================================================================== */}
      {activeTab === 'admin' && isAdmin && (
        <main className="max-w-5xl mx-auto px-4 pt-6 space-y-6">
          <div className="bg-zinc-900 text-white rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold mb-2">
                <ShieldCheck className="w-3.5 h-3.5" /> 관리자 모드 활성화됨
              </div>
              <h1 className="text-xl font-black">숏폼 커머스 통합 제어 센터</h1>
              <p className="text-xs text-zinc-400 mt-1">
                새 숏폼 상품 등록, 클릭 통계 확인, Supabase 실시간 DB 연동 및 공용 PIN 변경을 한 곳에서 관리합니다.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={openNewProductModal}
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs font-black shadow"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" /> 새 숏폼·상품 등록
              </button>
              <button
                onClick={handleLockAdmin}
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold"
              >
                <Lock className="w-4 h-4" /> 잠금 후 나가기
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-500">
                <Package className="w-4 h-4 text-zinc-900" /> 등록된 숏폼 상품 수
              </div>
              <p className="text-2xl font-black mt-2">{products.length}개</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-500">
                <MousePointerClick className="w-4 h-4 text-blue-600" /> 누적 구매 링크 클릭
              </div>
              <p className="text-2xl font-black text-blue-600 mt-2">
                {totalClicks.toLocaleString()}회
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-500">
                <Database className="w-4 h-4 text-emerald-600" /> 데이터베이스 상태
              </div>
              <p className="text-sm font-black mt-2.5 flex items-center gap-1.5">
                {dbConnected ? (
                  <span className="text-emerald-600">● Supabase 실시간 연동 중</span>
                ) : (
                  <span className="text-amber-600">● 로컬 저장 모드 (미연결)</span>
                )}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <form
              onSubmit={handleConnectSupabase}
              className="lg:col-span-7 bg-white rounded-2xl border border-zinc-200 p-5 space-y-3 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-extrabold flex items-center gap-1.5">
                  <Database className="w-4 h-4 text-emerald-600" />
                  Supabase 공용 데이터베이스 연결
                </h2>
                {dbConnected && (
                  <button
                    type="button"
                    onClick={() => fetchFromSupabase()}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg"
                  >
                    <RefreshCw className={`w-3 h-3 ${isSyncingDb ? 'animate-spin' : ''}`} />
                    새로고침
                  </button>
                )}
              </div>
              <p className="text-[11px] text-zinc-500">
                Supabase URL과 Anon Key를 연결하면 등록한 상품과 관리자 비밀번호가 모든 기기에 실시간으로 공유됩니다.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <input
                  type="url"
                  value={sbUrl}
                  onChange={(e) => setSbUrl(e.target.value)}
                  placeholder="https://프로젝트ID.supabase.co"
                  className="px-3 py-2 rounded-xl border border-zinc-300 text-xs"
                />
                <input
                  type="password"
                  value={sbKey}
                  onChange={(e) => setSbKey(e.target.value)}
                  placeholder="Supabase anon public 키"
                  className="px-3 py-2 rounded-xl border border-zinc-300 text-xs"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
              >
                DB 연결 및 동기화
              </button>
            </form>

            <form
              onSubmit={handleChangePin}
              className="lg:col-span-5 bg-white rounded-2xl border border-zinc-200 p-5 space-y-3 shadow-sm"
            >
              <h2 className="text-sm font-extrabold flex items-center gap-1.5">
                <KeyRound className="w-4 h-4 text-zinc-900" />
                전체 기기 공용 PIN 비밀번호 변경
              </h2>
              <p className="text-[11px] text-zinc-500">
                여기서 변경하면 Supabase DB에 즉시 저장되어 모든 PC·스마트폰 방문자에게 새 비밀번호가 적용됩니다.
              </p>
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
                  className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold shrink-0"
                >
                  변경
                </button>
              </div>
            </form>
          </div>

          <section className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-extrabold flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-zinc-900" />
                등록 상품 목록 및 실시간 클릭 순위
              </h2>
              <button
                onClick={openNewProductModal}
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                + 새 상품 추가하기
              </button>
            </div>

            <div className="space-y-2.5">
              {[...products]
                .sort((a, b) => (b.click_count || 0) - (a.click_count || 0))
                .map((item) => {
                  const post = item.shortform_posts;
                  return (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-2xl border border-zinc-200 hover:border-zinc-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
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
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="px-2 py-0.5 bg-zinc-900 text-white rounded text-[11px] font-black">
                              #{post?.video_number || '-'}번
                            </span>
                            {renderPlatformBadge(post?.platform)}
                            {item.badge_text && (
                              <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded">
                                {item.badge_text}
                              </span>
                            )}
                          </div>
                          <p className="text-sm font-extrabold text-zinc-900 truncate">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-zinc-400 truncate">
                            {item.purchase_url}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-zinc-100">
                        <div className="bg-blue-50 px-3 py-1.5 rounded-xl text-center">
                          <span className="block text-[10px] font-bold text-blue-600">
                            누적 클릭
                          </span>
                          <span className="text-sm font-black text-blue-700">
                            {(item.click_count || 0).toLocaleString()}회
                          </span>
                        </div>

                        <button
                          onClick={() => openEditProductModal(item)}
                          className="p-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700"
                          title="수정"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(item)}
                          className="p-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600"
                          title="삭제"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </section>
        </main>
      )}

      {/* =====================================================================
          TAB 3: 핫딜·후기·질문 커뮤니티 게시판
      ===================================================================== */}
      {activeTab === 'community' && (
        <main className="max-w-3xl mx-auto px-4 pt-6 space-y-6">
          <div>
            <h1 className="text-2xl font-black">핫딜 & 실사용 커뮤니티</h1>
            <p className="text-xs text-zinc-500 mt-1">
              숏폼 추천템 실사용 후기와 최저가 할인 정보를 자유롭게 공유하세요.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!newPostTitle.trim() || !newPostContent.trim()) return;
              setCommunityPosts((prev) => [
                {
                  id: `c-${Date.now()}`,
                  category: newPostCat,
                  author: isAdmin ? '관리자' : '방문자',
                  title: newPostTitle.trim(),
                  content: newPostContent.trim(),
                  likes: 1,
                  comments: 0,
                  createdAt: '방금 전',
                },
                ...prev,
              ]);
              setNewPostTitle('');
              setNewPostContent('');
              showToast('✅ 커뮤니티에 게시글이 등록되었습니다.');
            }}
            className="bg-white rounded-2xl border border-zinc-200 p-4 space-y-3 shadow-sm"
          >
            <div className="flex gap-2">
              <select
                value={newPostCat}
                onChange={(e) => setNewPostCat(e.target.value)}
                className="px-3 py-2 rounded-xl border border-zinc-300 text-xs font-bold bg-white"
              >
                <option value="hotdeal">🔥 핫딜제보</option>
                <option value="review">⭐ 실사용후기</option>
                <option value="qna">❓ 번호질문</option>
              </select>
              <input
                type="text"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                placeholder="제목을 입력하세요 (예: #104번 충전기 쿠폰 정보 공유)"
                className="flex-1 px-3.5 py-2 rounded-xl border border-zinc-300 text-xs"
              />
            </div>
            <textarea
              rows={2}
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="내용을 입력하세요..."
              className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 text-xs"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 text-white text-xs font-bold hover:bg-zinc-800"
              >
                <Send className="w-3.5 h-3.5" /> 글 등록하기
              </button>
            </div>
          </form>

          <div className="flex gap-2">
            {[
              { id: 'all', label: '전체' },
              { id: 'hotdeal', label: '🔥 핫딜제보' },
              { id: 'review', label: '⭐ 실사용후기' },
              { id: 'qna', label: '❓ 번호질문' },
            ].map((c) => (
              <button
                key={c.id}
                onClick={() => setCommunityCategory(c.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                  communityCategory === c.id
                    ? 'bg-zinc-900 text-white'
                    : 'bg-white border border-zinc-200 text-zinc-600'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {communityPosts
              .filter((p) => communityCategory === 'all' || p.category === communityCategory)
              .map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-2xl border border-zinc-200 p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1.5">
                    <span className="font-bold text-zinc-700">{post.author}</span>
                    <span>{post.createdAt}</span>
                  </div>
                  <h3 className="text-sm font-extrabold text-zinc-900">{post.title}</h3>
                  <p className="text-xs text-zinc-600 mt-1.5 leading-relaxed">{post.content}</p>
                  <div className="flex items-center gap-4 mt-3 pt-2.5 border-t border-zinc-100 text-xs text-zinc-500">
                    <button
                      onClick={() =>
                        setCommunityPosts((prev) =>
                          prev.map((item) =>
                            item.id === post.id ? { ...item, likes: item.likes + 1 } : item
                          )
                        )
                      }
                      className="inline-flex items-center gap-1 hover:text-rose-500 font-semibold"
                    >
                      <Heart className="w-3.5 h-3.5" /> 좋아요 {post.likes}
                    </button>
                    <span className="inline-flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5" /> 댓글 {post.comments}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </main>
      )}

      {/* =====================================================================
          TAB 4: 문서·가이드북 자료실
      ===================================================================== */}
      {activeTab === 'resources' && (
        <main className="max-w-3xl mx-auto px-4 pt-6 space-y-5">
          <div>
            <h1 className="text-2xl font-black">큐레이션 자료실 & 템플릿</h1>
            <p className="text-xs text-zinc-500 mt-1">
              카테고리별 베스트 아이템 비교표와 체크리스트 문서를 다운로드할 수 있습니다.
            </p>
          </div>

          <div className="space-y-3">
            {INITIAL_RESOURCES.map((resItem) => (
              <div
                key={resItem.id}
                className="bg-white rounded-2xl border border-zinc-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                        resItem.tier.includes('Pro')
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-zinc-100 text-zinc-700'
                      }`}
                    >
                      {resItem.tier}
                    </span>
                    <span className="text-[11px] text-zinc-400">
                      {resItem.fileSize} · 누적 {resItem.downloads.toLocaleString()}회 다운로드
                    </span>
                  </div>
                  <h3 className="text-sm font-extrabold text-zinc-900">{resItem.title}</h3>
                  <p className="text-xs text-zinc-500">{resItem.description}</p>
                </div>

                <button
                  onClick={() =>
                    showToast(`📥 '${resItem.title.slice(0, 18)}...' 보안 다운로드 링크가 생성되었습니다.`)
                  }
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold shrink-0"
                >
                  <Download className="w-3.5 h-3.5" /> 다운로드
                </button>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* =====================================================================
          TAB 5: 멤버십 구독 & 1:1 컨설팅·공동구매 예약
      ===================================================================== */}
      {activeTab === 'pricing' && (
        <main className="max-w-4xl mx-auto px-4 pt-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-black">멤버십 구독 & 일정 예약</h1>
            <p className="text-xs text-zinc-500 mt-1">
              프리미엄 소싱 리스트 열람 및 1:1 숏폼 마케팅·공동구매 입점 예약을 신청하세요.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                name: 'Free 일반 회원',
                price: '0원',
                desc: '숏폼 상품 번호 검색 및 기본 커뮤니티 이용',
                features: ['전체 숏폼 영상 번호 검색', '무료 자료실 PDF 다운로드', '핫딜 커뮤니티 글쓰기'],
                highlight: false,
              },
              {
                name: 'Pro 크리에이터',
                price: '월 19,900원',
                desc: 'AI 대본 생성기 및 프리미엄 소싱 리스트 무제한',
                features: [
                  '제미나이 AI 숏폼 대본 무제한',
                  'Pro 전용 소싱 리스트·템플릿',
                  '공동구매 우선 알림 및 할인 쿠폰',
                ],
                highlight: true,
              },
              {
                name: 'VIP 브랜드 파트너',
                price: '월 59,000원',
                desc: '자사 상품 숏폼 노출 및 전담 마케팅 분석',
                features: [
                  '월 4회 숏폼 리뷰 영상 우선 편성',
                  '상세 유입 플랫폼 전환율 리포트',
                  '1:1 전담 매니저 컨설팅 포함',
                ],
                highlight: false,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-3xl p-6 flex flex-col justify-between ${
                  plan.highlight
                    ? 'bg-zinc-900 text-white shadow-lg ring-2 ring-amber-400'
                    : 'bg-white border border-zinc-200 text-zinc-900'
                }`}
              >
                <div>
                  {plan.highlight && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-black bg-amber-400 text-zinc-950 px-2.5 py-0.5 rounded-full mb-3">
                      <Crown className="w-3 h-3" /> BEST 추천
                    </span>
                  )}
                  <h3 className="text-base font-extrabold">{plan.name}</h3>
                  <p className="text-2xl font-black mt-2">{plan.price}</p>
                  <p
                    className={`text-xs mt-1 ${
                      plan.highlight ? 'text-zinc-400' : 'text-zinc-500'
                    }`}
                  >
                    {plan.desc}
                  </p>
                  <ul className="mt-4 space-y-2 text-xs">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check
                          className={`w-4 h-4 shrink-0 ${
                            plan.highlight ? 'text-amber-400' : 'text-zinc-900'
                          }`}
                        />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => showToast(`💳 '${plan.name}' 구독 결제창을 준비하고 있습니다.`)}
                  className={`mt-6 w-full py-3 rounded-2xl text-xs font-extrabold transition-all ${
                    plan.highlight
                      ? 'bg-amber-400 hover:bg-amber-300 text-zinc-950'
                      : 'bg-zinc-900 hover:bg-zinc-800 text-white'
                  }`}
                >
                  멤버십 시작하기
                </button>
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!bookingName.trim() || !bookingDate) {
                showToast('⚠️ 성함과 희망 날짜를 입력해 주세요.');
                return;
              }
              showToast(`📅 ${bookingDate} [${bookingTopic}] 예약 신청이 접수되었습니다!`);
              setBookingName('');
              setBookingDate('');
            }}
            className="bg-white rounded-3xl border border-zinc-200 p-6 space-y-4 shadow-sm"
          >
            <h2 className="text-base font-extrabold flex items-center gap-2">
              <Calendar className="w-5 h-5 text-zinc-900" />
              1:1 컨설팅 · 공동구매 · 광고 입점 일정 예약
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                value={bookingName}
                onChange={(e) => setBookingName(e.target.value)}
                placeholder="신청자 성함 또는 브랜드명"
                className="px-3.5 py-2.5 rounded-xl border border-zinc-300 text-xs"
              />
              <select
                value={bookingTopic}
                onChange={(e) => setBookingTopic(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl border border-zinc-300 text-xs bg-white"
              >
                <option>1:1 숏폼 커머스 수익화 컨설팅</option>
                <option>신규 상품 숏폼 공동구매 입점 문의</option>
                <option>브랜드 협찬 및 광고 제작 의뢰</option>
              </select>
              <input
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl border border-zinc-300 text-xs"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-extrabold"
            >
              일정 예약 신청하기
            </button>
          </form>
        </main>
      )}

      {/* =====================================================================
          MODAL 1: 관리자 PIN 비밀번호 인증 모달
      ===================================================================== */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-zinc-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-2xl bg-zinc-900 text-amber-400 flex items-center justify-center">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-zinc-900">관리자 인증</h3>
                  <p className="text-[11px] text-zinc-500">관리자 전용 PIN 번호를 입력하세요</p>
                </div>
              </div>
              <button
                onClick={() => setShowPinModal(false)}
                className="p-1.5 rounded-xl hover:bg-zinc-100 text-zinc-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleVerifyPin} className="space-y-3">
              <input
                type="password"
                autoFocus
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="관리자 PIN 번호 입력"
                className="w-full px-4 py-3 rounded-2xl border-2 border-zinc-900 text-center text-base font-black tracking-widest focus:outline-none"
              />
              {pinError && (
                <p className="text-xs font-bold text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {pinError}
                </p>
              )}
              <button
                type="submit"
                disabled={isVerifyingPin}
                className="w-full py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-extrabold"
              >
                {isVerifyingPin ? '인증 확인 중...' : '잠금 해제 및 관리자 진입'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 2: 새 숏폼 링크 & 상품 구매 링크 등록/수정 모달
      ===================================================================== */}
      {showProductModal && isAdmin && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-zinc-200 my-auto">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
              <div>
                <h2 className="text-lg font-black text-zinc-900">
                  {editingItem ? '숏폼 상품 정보 수정' : '새 숏폼 & 상품 구매 링크 등록'}
                </h2>
                <p className="text-xs text-zinc-500 mt-0.5">
                  영상 번호와 구매 링크를 연결하면 방문자가 번호 검색만으로 즉시 구매할 수 있습니다.
                </p>
              </div>
              <button
                onClick={() => setShowProductModal(false)}
                className="p-2 rounded-xl hover:bg-zinc-100 text-zinc-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProducts} className="space-y-5 mt-5">
              {/* STEP 1: 숏폼 영상 정보 */}
              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
                <p className="text-xs font-black text-zinc-900">
                  STEP 1. 숏폼 영상 정보 (릴스 · 틱톡 · 쇼츠)
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-600 mb-1">
                      영상 번호 (필수) *
                    </label>
                    <input
                      type="number"
                      required
                      value={videoNumber}
                      onChange={(e) => setVideoNumber(e.target.value)}
                      placeholder="예: 105"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-white text-sm font-black"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-600 mb-1">
                      숏폼 플랫폼 *
                    </label>
                    <select
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-white text-xs font-bold"
                    >
                      <option value="instagram">Instagram (릴스)</option>
                      <option value="tiktok">TikTok (틱톡)</option>
                      <option value="youtube">YouTube (쇼츠)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-600 mb-1">
                    원본 숏폼 영상 URL (붙여넣으면 플랫폼 자동 인식)
                  </label>
                  <input
                    type="url"
                    value={videoUrl}
                    onChange={(e) => handleVideoUrlChange(e.target.value)}
                    placeholder="https://www.instagram.com/reel/... 또는 tiktok / youtube shorts 링크"
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 bg-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-600 mb-1">
                    숏폼 영상 제목
                  </label>
                  <input
                    type="text"
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    placeholder="예: 자취방 공간 활용 2배 늘려주는 수납 꿀템"
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 bg-white text-xs"
                  />
                </div>
              </div>

              {/* STEP 2: 상품 구매 링크 */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-black text-zinc-900">
                    STEP 2. 연결할 상품 구매 링크 ({formItems.length}개)
                  </p>
                  {!editingItem && (
                    <button
                      type="button"
                      onClick={() =>
                        setFormItems((prev) => [
                          ...prev,
                          {
                            purchaseUrl: '',
                            name: '',
                            price: '',
                            imageUrl: '',
                            badgeText: '',
                            description: '',
                          },
                        ])
                      }
                      className="text-xs font-bold text-blue-600 hover:underline"
                    >
                      + 이 영상에 상품 추가
                    </button>
                  )}
                </div>

                {formItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200/80 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black text-blue-900">
                        상품 #{videoNumber || '105'}-{String.fromCharCode(65 + idx)}
                      </span>
                      {formItems.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            setFormItems((prev) => prev.filter((_, i) => i !== idx))
                          }
                          className="text-[11px] font-bold text-red-600"
                        >
                          삭제
                        </button>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="url"
                        required
                        value={item.purchaseUrl}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormItems((prev) =>
                            prev.map((it, i) => (i === idx ? { ...it, purchaseUrl: val } : it))
                          );
                        }}
                        placeholder="https://smartstore.naver.com/... 구매 링크 붙여넣기"
                        className="flex-1 px-3 py-2 rounded-xl border border-blue-300 bg-white text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => handleScrapeProductUrl(idx)}
                        disabled={scrapingIdx === idx}
                        className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shrink-0 inline-flex items-center gap-1"
                      >
                        {scrapingIdx === idx ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Wand2 className="w-3.5 h-3.5" />
                        )}
                        자동 추출
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <input
                        type="text"
                        required
                        value={item.name}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormItems((prev) =>
                            prev.map((it, i) => (i === idx ? { ...it, name: val } : it))
                          );
                        }}
                        placeholder="상품명 (필수) *"
                        className="sm:col-span-2 px-3 py-2 rounded-xl border border-zinc-300 bg-white text-xs font-bold"
                      />
                      <input
                        type="number"
                        value={item.price}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormItems((prev) =>
                            prev.map((it, i) => (i === idx ? { ...it, price: val } : it))
                          );
                        }}
                        placeholder="가격(원)"
                        className="px-3 py-2 rounded-xl border border-zinc-300 bg-white text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <input
                        type="text"
                        value={item.badgeText}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormItems((prev) =>
                            prev.map((it, i) => (i === idx ? { ...it, badgeText: val } : it))
                          );
                        }}
                        placeholder="강조 배지 (예: 릴스 100만뷰)"
                        className="px-3 py-2 rounded-xl border border-zinc-300 bg-white text-xs"
                      />
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormItems((prev) =>
                            prev.map((it, i) => (i === idx ? { ...it, description: val } : it))
                          );
                        }}
                        placeholder="한 줄 상품 설명"
                        className="px-3 py-2 rounded-xl border border-zinc-300 bg-white text-xs"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      {item.imageUrl && (
                        <img
                          src={item.imageUrl}
                          alt="미리보기"
                          className="w-10 h-10 rounded-xl object-cover border border-zinc-300 shrink-0 bg-white"
                        />
                      )}
                      <input
                        type="text"
                        value={item.imageUrl}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormItems((prev) =>
                            prev.map((it, i) => (i === idx ? { ...it, imageUrl: val } : it))
                          );
                        }}
                        placeholder="상품 이미지 URL 또는 우측 사진 업로드"
                        className="flex-1 px-3 py-2 rounded-xl border border-zinc-300 bg-white text-xs"
                      />
                      <label className="cursor-pointer inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-white border border-zinc-300 hover:bg-zinc-100 text-xs font-bold shrink-0">
                        <Upload className="w-3.5 h-3.5" /> 사진 선택
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleLocalImageUpload(idx, e.target.files?.[0])}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              {/* STEP 3: AI 마케팅 문구 자동 완성 */}
              <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200/80 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-indigo-950">
                    STEP 3. AI 3줄 요약 & 해시태그
                  </span>
                  <button
                    type="button"
                    onClick={handleAiAutoFill}
                    disabled={isAiGenerating}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold"
                  >
                    {isAiGenerating ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5" />
                    )}
                    AI 자동 완성
                  </button>
                </div>

                <textarea
                  rows={3}
                  value={aiSummary}
                  onChange={(e) => setAiSummary(e.target.value)}
                  placeholder="AI 3줄 요약 내용 (자동 완성 버튼을 누르거나 직접 작성)"
                  className="w-full px-3 py-2 rounded-xl border border-indigo-200 bg-white text-xs"
                />
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="해시태그 (쉼표로 구분: 꿀템추천, 자취필수템)"
                  className="w-full px-3 py-2 rounded-xl border border-indigo-200 bg-white text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="px-4 py-3 rounded-2xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-bold"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={isSavingProduct}
                  className="px-6 py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-extrabold shadow"
                >
                  {isSavingProduct
                    ? '저장 중...'
                    : editingItem
                    ? '수정 완료'
                    : '스토어에 상품 등록하기'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}