// src/components/StoreView.jsx
import React, { useState, useMemo } from 'react';
import {
  Search,
  Instagram,
  Youtube,
  Music2,
  ExternalLink,
  Sparkles,
  Play,
  X,
  Edit3,
  Trash2,
  ShoppingBag,
  Share2,
} from 'lucide-react';

export default function StoreView({
  products,
  isAdmin,
  onProductClick,
  onOpenDirectShop,
  onEditProduct,
  onDeleteProduct,
  onCopyShopLink,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [expandedSummaryId, setExpandedSummaryId] = useState(null);

  // 실시간 번호 및 키워드 필터링
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

  const renderPlatformBadge = (plat) => {
    switch (plat) {
      case 'instagram':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white shadow-sm">
            <Instagram className="w-3 h-3" /> Reels
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
            <Youtube className="w-3 h-3" /> Shorts
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
    <main className="max-w-3xl mx-auto px-4 pt-6">
      {/* 상단 히어로 안내 */}
      <div className="text-center mb-5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 text-white text-[11px] font-bold mb-2.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          릴스 · 틱톡 · 쇼츠 화제의 추천템 공식 스토어
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900">
          영상에서 본 그 상품 찾기
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 mt-1">
          영상에 안내된 <strong className="text-zinc-900">#영상번호</strong>를 검색하면 바로 구매할 수 있습니다.
        </p>
      </div>

      {/* 상단 고정 번호 검색바 */}
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

      {/* 상품 목록 그리드 */}
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
            const isDirectSale = item.sale_type === 'direct';

            return (
              <article
                key={item.id}
                className="bg-white rounded-3xl border border-zinc-200/90 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* 썸네일 영역 */}
                  <div
                    onClick={() => (isDirectSale ? onOpenDirectShop(item) : null)}
                    className={`relative aspect-[4/3] bg-zinc-100 overflow-hidden ${
                      isDirectSale ? 'cursor-pointer' : ''
                    }`}
                  >
                    <img
                      src={
                        item.image_url ||
                        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&q=80'
                      }
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />

                    {/* 좌측 상단: 영상 번호 & 판매 방식 배지 */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="bg-zinc-950/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-xl text-xs font-black shadow">
                        #{post?.video_number || '-'}번
                      </span>
                      {isDirectSale && (
                        <span className="bg-emerald-600 text-white px-2 py-1 rounded-xl text-[10px] font-black shadow">
                          바로결제
                        </span>
                      )}
                    </div>

                    {/* 우측 상단: 플랫폼 배지 */}
                    <div className="absolute top-3 right-3">
                      {renderPlatformBadge(post?.platform)}
                    </div>

                    {/* 하단: 강조 배지 */}
                    {item.badge_text && (
                      <div className="absolute bottom-2.5 left-3">
                        <span className="inline-flex items-center gap-1 bg-amber-400 text-zinc-950 text-[11px] font-extrabold px-2.5 py-1 rounded-lg shadow">
                          <Sparkles className="w-3 h-3 fill-zinc-950" />
                          {item.badge_text}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* 상품 정보 본문 */}
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

                {/* 하단 액션 버튼 (자체 직접 판매 vs 외부 제휴 링크 자동 분기) */}
                <div className="px-4 pb-4 pt-1 space-y-2">
                  <div className="flex items-center gap-2">
                    {isDirectSale ? (
                      <button
                        onClick={() => {
                          onProductClick(item);
                          onOpenDirectShop(item);
                        }}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white text-xs font-extrabold rounded-2xl transition-all shadow-sm"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        상세보기 & 바로 주문
                      </button>
                    ) : (
                      <a
                        href={item.purchase_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => onProductClick(item)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 px-4 bg-zinc-900 hover:bg-zinc-800 active:scale-[0.99] text-white text-xs font-extrabold rounded-2xl transition-all shadow-sm"
                      >
                        구매하러 가기
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    {/* 인스타/쇼츠 전용 직행 판매 링크 복사 버튼 */}
                    <button
                      onClick={() => onCopyShopLink(item)}
                      title="인스타·쇼츠 프로필용 직행 링크 복사"
                      className="p-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-2xl transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>

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

                  {/* 관리자 전용 빠른 수정/삭제 바 */}
                  {isAdmin && (
                    <div className="flex items-center justify-end gap-1.5 pt-1 border-t border-zinc-100">
                      <span className="text-[10px] font-bold text-blue-600 mr-auto">
                        클릭 {item.click_count || 0}회
                      </span>
                      <button
                        onClick={() => onEditProduct(item)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-[11px] font-bold"
                      >
                        <Edit3 className="w-3 h-3" /> 수정
                      </button>
                      <button
                        onClick={() => onDeleteProduct(item)}
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
  );
}