// src/components/ProductFormModal.jsx
import React, { useState } from 'react';
import { X, Wand2, Loader2, Upload, Sparkles } from 'lucide-react';

export default function ProductFormModal({
  editingItem,
  defaultVideoNumber,
  onClose,
  onSave,
  onShowToast,
}) {
  const [videoNumber, setVideoNumber] = useState(
    editingItem ? String(editingItem.shortform_posts?.video_number || '') : defaultVideoNumber
  );
  const [platform, setPlatform] = useState(
    editingItem?.shortform_posts?.platform || 'instagram'
  );
  const [videoUrl, setVideoUrl] = useState(editingItem?.shortform_posts?.video_url || '');
  const [videoTitle, setVideoTitle] = useState(editingItem?.shortform_posts?.title || '');

  // 판매 방식 ('direct': 자체 직접 판매 | 'affiliate': 외부 제휴 링크)
  const [saleType, setSaleType] = useState(editingItem?.sale_type || 'direct');
  const [purchaseUrl, setPurchaseUrl] = useState(editingItem?.purchase_url || '');
  const [productName, setProductName] = useState(editingItem?.name || '');
  const [price, setPrice] = useState(editingItem?.price ? String(editingItem.price) : '');
  const [optionsInput, setOptionsInput] = useState(
    Array.isArray(editingItem?.options) ? editingItem.options.join(', ') : ''
  );
  const [imageUrl, setImageUrl] = useState(editingItem?.image_url || '');
  const [badgeText, setBadgeText] = useState(editingItem?.badge_text || '');
  const [description, setDescription] = useState(editingItem?.description || '');
  const [aiSummary, setAiSummary] = useState(editingItem?.shortform_posts?.ai_summary || '');
  const [tagsInput, setTagsInput] = useState(
    Array.isArray(editingItem?.shortform_posts?.tags)
      ? editingItem.shortform_posts.tags.join(', ')
      : ''
  );

  const [isScraping, setIsScraping] = useState(false);
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  // 오픈그래프(OG) 링크 자동 추출
  const handleScrapeUrl = async () => {
    if (!purchaseUrl.trim().startsWith('http')) {
      onShowToast('⚠️ 올바른 상품 링크(https://...)를 먼저 입력해 주세요.');
      return;
    }
    setIsScraping(true);
    try {
      const res = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(purchaseUrl)}`);
      const json = await res.json();
      if (json.status === 'success' && json.data) {
        if (json.data.title) setProductName(json.data.title);
        if (json.data.image?.url) setImageUrl(json.data.image.url);
        if (json.data.description) setDescription(json.data.description);
        onShowToast('🔗 링크에서 상품명과 이미지를 자동으로 불러왔습니다!');
      } else {
        throw new Error();
      }
    } catch {
      onShowToast('ℹ️ 차단된 링크입니다. 상품명과 이미지를 직접 입력해 주세요.');
    } finally {
      setIsScraping(false);
    }
  };

  // 로컬 이미지 파일 선택 미리보기
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
      onShowToast('📸 선택한 사진이 상품 썸네일로 적용되었습니다.');
    };
    reader.readAsDataURL(file);
  };

  // AI 마케팅 문구 자동 완성
  const handleAiAutoFill = () => {
    if (!productName.trim()) {
      onShowToast('⚠️ 먼저 상품명을 입력해 주세요.');
      return;
    }
    setIsAiGenerating(true);
    setTimeout(() => {
      const pLabel = platform === 'instagram' ? '릴스' : platform === 'tiktok' ? '틱톡' : '쇼츠';
      if (!videoTitle.trim()) {
        setVideoTitle(`요즘 ${pLabel}에서 화제인 '${productName.slice(0, 18)}' 추천템`);
      }
      if (!badgeText.trim()) {
        setBadgeText(saleType === 'direct' ? `${pLabel} 단독 공구특가` : `${pLabel} 화제템`);
      }
      setAiSummary(
        `• ${productName}의 핵심 기능을 일상에서 가장 편하게 활용할 수 있는 구성\n• 불필요한 과정을 줄여 시간과 비용을 동시에 아껴주는 실속형 추천템\n• 현재 온라인 최저가 혜택 및 빠른 출고로 만나볼 수 있는 인기 상품`
      );
      setTagsInput(`${pLabel}추천템, 가성비꿀템, 실사용후기`);
      setIsAiGenerating(false);
      onShowToast('✨ AI 마케팅 문구와 해시태그가 완성되었습니다!');
    }, 450);
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
    const parsedTags = tagsInput
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    onSave({
      videoNumber: Number(videoNumber),
      platform,
      videoUrl: videoUrl.trim(),
      videoTitle: videoTitle.trim() || `${productName.trim()} 추천 영상`,
      saleType,
      purchaseUrl: purchaseUrl.trim(),
      name: productName.trim(),
      price: Number(price) || 0,
      options: parsedOptions,
      imageUrl: imageUrl.trim(),
      badgeText: badgeText.trim(),
      description: description.trim(),
      aiSummary: aiSummary.trim(),
      tags: parsedTags,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-zinc-200 my-auto">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
          <div>
            <h2 className="text-lg font-black text-zinc-900">
              {editingItem ? '숏폼 상품 정보 수정' : '새 숏폼 상품 등록'}
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              자체 직접 판매 페이지 또는 외부 제휴 링크 중 선택해 등록할 수 있습니다.
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-zinc-100 text-zinc-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-5">
          {/* 판매 방식 선택 토글 */}
          <div className="grid grid-cols-2 gap-2 p-1.5 bg-zinc-100 rounded-2xl">
            <button
              type="button"
              onClick={() => setSaleType('direct')}
              className={`py-2.5 rounded-xl text-xs font-black transition-all ${
                saleType === 'direct'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              🛍️ 자체 직접 판매 (내 사이트에서 바로 주문)
            </button>
            <button
              type="button"
              onClick={() => setSaleType('affiliate')}
              className={`py-2.5 rounded-xl text-xs font-black transition-all ${
                saleType === 'affiliate'
                  ? 'bg-zinc-900 text-white shadow'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              🔗 외부 제휴 링크 (쿠팡·스마트스토어 이동)
            </button>
          </div>

          {/* 영상 번호 & 플랫폼 */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-zinc-600 mb-1">
                숏폼 영상 번호 *
              </label>
              <input
                type="number"
                required
                value={videoNumber}
                onChange={(e) => setVideoNumber(e.target.value)}
                placeholder="예: 105"
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm font-black"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-zinc-600 mb-1">
                업로드 플랫폼 *
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-xs font-bold bg-white"
              >
                <option value="instagram">Instagram (릴스)</option>
                <option value="tiktok">TikTok (틱톡)</option>
                <option value="youtube">YouTube (쇼츠)</option>
              </select>
            </div>
          </div>

          {/* 외부 링크 (제휴링크 시 필수, 직접판매 시 보조 참고용) */}
          <div>
            <label className="block text-[11px] font-bold text-zinc-600 mb-1">
              {saleType === 'affiliate'
                ? '외부 구매 링크 URL (필수) *'
                : '참고용 상품 링크 URL (선택 - 정보 자동 추출용)'}
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                required={saleType === 'affiliate'}
                value={purchaseUrl}
                onChange={(e) => setPurchaseUrl(e.target.value)}
                placeholder="https://..."
                className="flex-1 px-3 py-2 rounded-xl border border-zinc-300 text-xs"
              />
              <button
                type="button"
                onClick={handleScrapeUrl}
                disabled={isScraping}
                className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shrink-0 inline-flex items-center gap-1"
              >
                {isScraping ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Wand2 className="w-3.5 h-3.5" />
                )}
                정보 추출
              </button>
            </div>
          </div>

          {/* 상품명 & 가격 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold text-zinc-600 mb-1">상품명 *</label>
              <input
                type="text"
                required
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="상품명을 입력하세요"
                className="w-full px-3 py-2.5 rounded-xl border border-zinc-300 text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-zinc-600 mb-1">판매 가격(원)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="34900"
                className="w-full px-3 py-2.5 rounded-xl border border-zinc-300 text-xs font-bold"
              />
            </div>
          </div>

          {/* 직접 판매 전용 옵션 설정 */}
          {saleType === 'direct' && (
            <div>
              <label className="block text-[11px] font-bold text-emerald-700 mb-1">
                판매 옵션 목록 (쉼표로 구분하여 입력)
              </label>
              <input
                type="text"
                value={optionsInput}
                onChange={(e) => setOptionsInput(e.target.value)}
                placeholder="예: 화이트 (단품), 블랙 (단품), 1+1 세트"
                className="w-full px-3 py-2 rounded-xl border border-emerald-300 bg-emerald-50/30 text-xs"
              />
            </div>
          )}

          {/* 썸네일 이미지 */}
          <div>
            <label className="block text-[11px] font-bold text-zinc-600 mb-1">
              상품 썸네일 이미지
            </label>
            <div className="flex items-center gap-2">
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="미리보기"
                  className="w-10 h-10 rounded-xl object-cover border border-zinc-300 shrink-0"
                />
              )}
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="이미지 주소 입력 또는 사진 업로드"
                className="flex-1 px-3 py-2 rounded-xl border border-zinc-300 text-xs"
              />
              <label className="cursor-pointer inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-xs font-bold shrink-0">
                <Upload className="w-3.5 h-3.5" /> 사진 선택
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </label>
            </div>
          </div>

          {/* 배지 & 한 줄 설명 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <input
              type="text"
              value={badgeText}
              onChange={(e) => setBadgeText(e.target.value)}
              placeholder="강조 배지 (예: 릴스 공구특가)"
              className="px-3 py-2 rounded-xl border border-zinc-300 text-xs"
            />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="상품 상세 한 줄 설명"
              className="px-3 py-2 rounded-xl border border-zinc-300 text-xs"
            />
          </div>

          {/* AI 자동 완성 영역 */}
          <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-indigo-950">AI 마케팅 요약 & 태그</span>
              <button
                type="button"
                onClick={handleAiAutoFill}
                disabled={isAiGenerating}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-indigo-600 text-white text-[11px] font-bold"
              >
                <Sparkles className="w-3 h-3" /> AI 자동 완성
              </button>
            </div>
            <textarea
              rows={2}
              value={aiSummary}
              onChange={(e) => setAiSummary(e.target.value)}
              placeholder="AI 3줄 요약 내용"
              className="w-full px-3 py-2 rounded-xl border border-indigo-200 bg-white text-xs"
            />
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
              className="px-6 py-2.5 rounded-xl bg-zinc-900 text-white text-xs font-extrabold"
            >
              {editingItem ? '수정 저장' : '상품 등록 완료'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}