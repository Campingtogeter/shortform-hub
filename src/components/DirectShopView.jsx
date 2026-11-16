// src/components/DirectShopView.jsx
import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  Truck,
  CheckCircle2,
  ChevronLeft,
  Plus,
  Minus,
  X,
  CreditCard,
  Building2,
  Share2,
  ExternalLink,
  Play,
} from 'lucide-react';

export default function DirectShopView({
  product,
  refPlatform = 'shortform',
  bankAccountInfo,
  onBackToStore,
  onSubmitOrder,
  onShowToast,
}) {
  const post = product?.shortform_posts;
  const availableOptions =
    Array.isArray(product?.options) && product.options.length > 0
      ? product.options
      : ['기본 구성 (1개)'];

  const [isOrderSheetOpen, setIsOrderSheetOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(availableOptions[0]);
  const [quantity, setQuantity] = useState(1);

  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [deliveryMemo, setDeliveryMemo] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('bank_transfer');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  if (!product) {
    return (
      <div className="max-w-lg mx-auto p-8 text-center">
        <p className="text-sm font-bold text-zinc-600">해당 상품 정보를 찾을 수 없습니다.</p>
        <button
          onClick={onBackToStore}
          className="mt-4 px-4 py-2 rounded-xl bg-zinc-900 text-white text-xs font-bold"
        >
          메인 스토어로 돌아가기
        </button>
      </div>
    );
  }

  const unitPrice = Number(product.price) || 0;
  const deliveryFee = unitPrice * quantity >= 30000 || unitPrice === 0 ? 0 : 3000;
  const totalPrice = unitPrice * quantity + deliveryFee;

  // 전용 직행 URL 복사 (?shop=영상번호)
  const handleCopyDirectUrl = () => {
    const shareUrl = `${window.location.origin}/?shop=${post?.video_number || ''}&ref=instagram`;
    navigator.clipboard?.writeText(shareUrl);
    onShowToast('🔗 인스타·쇼츠 프로필용 상품 판매 링크가 복사되었습니다!');
  };

  const handleOrderFormSubmit = async (e) => {
    e.preventDefault();
    if (!buyerName.trim() || !buyerPhone.trim() || !shippingAddress.trim()) {
      onShowToast('⚠️ 받는 분 성함, 연락처, 배송지를 모두 입력해 주세요.');
      return;
    }

    setIsSubmitting(true);
    const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;
    const newOrder = {
      order_number: orderNumber,
      product_id: String(product.id).startsWith('item-') || String(product.id).startsWith('local-')
        ? null
        : product.id,
      product_name: product.name,
      selected_option: selectedOption,
      quantity,
      total_price: totalPrice,
      buyer_name: buyerName.trim(),
      buyer_phone: buyerPhone.trim(),
      shipping_address: shippingAddress.trim(),
      delivery_memo: deliveryMemo.trim(),
      payment_method: paymentMethod,
      order_status: 'pending_payment',
      referrer_platform: refPlatform,
      created_at: new Date().toISOString(),
    };

    try {
      await onSubmitOrder(newOrder);
      setCompletedOrder(newOrder);
      setIsOrderSheetOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 주문 완료 영수증 화면
  if (completedOrder) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl border border-zinc-200 p-6 shadow-xl text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <span className="text-xs font-extrabold text-emerald-600">
              주문번호 {completedOrder.order_number}
            </span>
            <h1 className="text-xl font-black text-zinc-900 mt-1">
              주문이 정상 접수되었습니다!
            </h1>
            <p className="text-xs text-zinc-500 mt-1">
              입금 확인 후 영업일 기준 1~2일 이내 빠르게 출고됩니다.
            </p>
          </div>

          <div className="bg-zinc-50 rounded-2xl p-4 text-left text-xs space-y-2 border border-zinc-200">
            <div className="flex justify-between">
              <span className="text-zinc-500">주문 상품</span>
              <span className="font-bold text-zinc-900 text-right max-w-[200px] truncate">
                {completedOrder.product_name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">옵션 / 수량</span>
              <span className="font-bold text-zinc-900">
                {completedOrder.selected_option} / {completedOrder.quantity}개
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">받는 분 / 연락처</span>
              <span className="font-bold text-zinc-900">
                {completedOrder.buyer_name} ({completedOrder.buyer_phone})
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">배송지</span>
              <span className="font-bold text-zinc-900 text-right max-w-[210px]">
                {completedOrder.shipping_address}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-zinc-200">
              <span className="font-bold text-zinc-700">총 결제 금액</span>
              <span className="text-base font-black text-emerald-600">
                {completedOrder.total_price.toLocaleString()}원
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-left text-xs text-amber-950 space-y-1">
            <p className="font-extrabold">🏦 입금 계좌 안내</p>
            <p className="font-bold">{bankAccountInfo}</p>
            <p className="text-[11px] text-amber-800">
              * 주문자 성함({completedOrder.buyer_name})과 동일하게 입금해 주세요.
            </p>
          </div>

          <button
            onClick={onBackToStore}
            className="w-full py-3.5 rounded-2xl bg-zinc-900 text-white text-xs font-extrabold"
          >
            다른 숏폼 추천 상품 더 보기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-28">
      {/* 모바일 최적화 1열 상품 상세 카드 */}
      <div className="max-w-lg mx-auto bg-white border-x border-b border-zinc-200 shadow-xs">
        {/* 상단 뒤로가기 및 영상 번호 인증 바 */}
        <div className="px-4 h-12 border-b border-zinc-100 flex items-center justify-between">
          <button
            onClick={onBackToStore}
            className="inline-flex items-center gap-1 text-xs font-bold text-zinc-700 hover:text-zinc-900"
          >
            <ChevronLeft className="w-4 h-4" /> 전체 상품 목록
          </button>
          <span className="text-[11px] font-black bg-zinc-900 text-white px-2.5 py-1 rounded-lg">
            #{post?.video_number || '-'}번 영상 공식 판매처
          </span>
          <button
            onClick={handleCopyDirectUrl}
            className="p-1.5 text-zinc-600 hover:text-zinc-900"
            title="판매 페이지 링크 복사"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* 1. 대표 상품 이미지 */}
        <div className="relative aspect-square bg-zinc-100">
          <img
            src={
              product.image_url ||
              'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'
            }
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.badge_text && (
            <div className="absolute bottom-3 left-3">
              <span className="inline-flex items-center gap-1 bg-amber-400 text-zinc-950 text-xs font-black px-3 py-1.5 rounded-xl shadow">
                <Sparkles className="w-3.5 h-3.5 fill-zinc-950" />
                {product.badge_text}
              </span>
            </div>
          )}
        </div>

        {/* 2. 상품명 · 가격 · 배송 안내 */}
        <div className="p-5 space-y-3 border-b border-zinc-100">
          {post?.title && (
            <p className="text-xs font-bold text-indigo-600">🎬 {post.title}</p>
          )}
          <h1 className="text-xl font-black text-zinc-900 leading-snug">{product.name}</h1>

          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-2xl font-black text-zinc-900">
              {unitPrice > 0 ? `${unitPrice.toLocaleString()}원` : '특가 문의'}
            </span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              3만원 이상 무료배송
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-zinc-600">
            <div className="flex items-center gap-1.5 bg-zinc-50 p-2.5 rounded-xl">
              <Truck className="w-4 h-4 text-zinc-900 shrink-0" />
              <span>오후 2시 이전 주문 당일출고</span>
            </div>
            <div className="flex items-center gap-1.5 bg-zinc-50 p-2.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-zinc-900 shrink-0" />
              <span>정품 보증 · 안전 주문</span>
            </div>
          </div>
        </div>

        {/* 3. AI 3줄 요약 및 상세 설명 */}
        <div className="p-5 space-y-4">
          {post?.ai_summary && (
            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 space-y-1.5">
              <p className="text-xs font-black text-indigo-950 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                구매 전 핵심 체크포인트
              </p>
              <p className="text-xs text-zinc-700 whitespace-pre-line leading-relaxed">
                {post.ai_summary}
              </p>
            </div>
          )}

          <div className="space-y-2">
            <h2 className="text-sm font-black text-zinc-900">상품 상세 안내</h2>
            <p className="text-xs text-zinc-600 leading-relaxed">
              {product.description || '숏폼 영상에서 소개된 인기 추천 아이템입니다.'}
            </p>
          </div>

          {/* 원본 숏폼 영상 & 외부 공식몰 보조 버튼 */}
          <div className="flex gap-2 pt-2">
            {post?.video_url && (
              <a
                href={post.video_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" /> 원본 숏폼 영상 보기
              </a>
            )}
            {product.purchase_url && (
              <a
                href={product.purchase_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold flex items-center justify-center gap-1.5"
              >
                외부 쇼핑몰 보기 <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* 하단 고정(Sticky) 바로 구매하기 바 */}
      <div className="fixed bottom-0 inset-x-0 z-30 bg-white border-t border-zinc-200 p-3.5 shadow-lg">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <div className="shrink-0">
            <span className="block text-[10px] font-bold text-zinc-400">특가 판매가</span>
            <span className="text-base font-black text-zinc-900">
              {unitPrice.toLocaleString()}원
            </span>
          </div>
          <button
            onClick={() => setIsOrderSheetOpen(true)}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white text-sm font-black shadow-md transition-all"
          >
            옵션 선택 및 바로 구매하기
          </button>
        </div>
      </div>

      {/* 주문 · 배송지 입력 바텀시트 모달 */}
      {isOrderSheetOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center">
          <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
              <h3 className="text-base font-black">간편 주문서 작성</h3>
              <button
                onClick={() => setIsOrderSheetOpen(false)}
                className="p-1.5 rounded-xl hover:bg-zinc-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleOrderFormSubmit} className="space-y-4 mt-4">
              {/* 옵션 및 수량 선택 */}
              <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-zinc-600 mb-1">
                    상품 옵션 선택
                  </label>
                  <select
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-zinc-300 bg-white text-xs font-bold"
                  >
                    {availableOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-700">주문 수량</span>
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

              {/* 배송지 정보 */}
              <div className="space-y-2.5">
                <p className="text-xs font-black text-zinc-900">배송지 정보</p>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="받는 분 성함 *"
                    className="px-3.5 py-2.5 rounded-xl border border-zinc-300 text-xs"
                  />
                  <input
                    type="tel"
                    required
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    placeholder="연락처 (010-0000-0000) *"
                    className="px-3.5 py-2.5 rounded-xl border border-zinc-300 text-xs"
                  />
                </div>
                <input
                  type="text"
                  required
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="도로명 주소 및 상세 주소 (동·호수) *"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-xs"
                />
                <input
                  type="text"
                  value={deliveryMemo}
                  onChange={(e) => setDeliveryMemo(e.target.value)}
                  placeholder="배송 요청사항 (예: 문 앞에 놓아주세요)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-xs"
                />
              </div>

              {/* 결제 수단 */}
              <div className="space-y-2">
                <p className="text-xs font-black text-zinc-900">결제 방법</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank_transfer')}
                    className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 ${
                      paymentMethod === 'bank_transfer'
                        ? 'border-zinc-900 bg-zinc-900 text-white'
                        : 'border-zinc-300 bg-white text-zinc-700'
                    }`}
                  >
                    <Building2 className="w-4 h-4" /> 무통장 입금
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('kakaopay')}
                    className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 ${
                      paymentMethod === 'kakaopay'
                        ? 'border-amber-400 bg-amber-400 text-zinc-950'
                        : 'border-zinc-300 bg-white text-zinc-700'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" /> 계좌이체 / 간편송금
                  </button>
                </div>
              </div>

              {/* 최종 결제 금액 요약 */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs space-y-1">
                <div className="flex justify-between text-zinc-600">
                  <span>상품 금액 ({quantity}개)</span>
                  <span>{(unitPrice * quantity).toLocaleString()}원</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>배송비</span>
                  <span>{deliveryFee === 0 ? '무료' : `${deliveryFee.toLocaleString()}원`}</span>
                </div>
                <div className="flex justify-between pt-1.5 border-t border-emerald-200 font-black text-sm text-emerald-950">
                  <span>최종 결제 금액</span>
                  <span>{totalPrice.toLocaleString()}원</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-black shadow-lg"
              >
                {isSubmitting
                  ? '주문 처리 중...'
                  : `${totalPrice.toLocaleString()}원 주문 완료하기`}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}