// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Lock, Unlock, Plus, BarChart3, X, AlertCircle } from 'lucide-react';
import {
  INITIAL_PRODUCTS,
  apiFetchProducts,
  apiCreateDirectOrder,
  apiFetchDirectOrders,
  apiUpdateOrderStatus,
} from './lib/storeApi';
import StoreView from './components/StoreView';
import DirectShopView from './components/DirectShopView';
import AdminDashboard from './components/AdminDashboard';
import ProductFormModal from './components/ProductFormModal';

export default function App() {
  const envUrl = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) || '';
  const envKey = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) || '';

  // URL 쿼리 파라미터 확인 (?shop=104 형태로 인스타·쇼츠에서 유입 시 전용 판매 페이지 오픈)
  const [activeTab, setActiveTab] = useState('store'); // 'store' | 'shop' | 'admin'
  const [selectedShopProduct, setSelectedShopProduct] = useState(null);
  const [refPlatform, setRefPlatform] = useState('shortform');

  // 관리자 인증 상태
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPin, setAdminPin] = useState(() => localStorage.getItem('sf_admin_pin') || '1234');
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  // Supabase DB 상태
  const [sbUrl, setSbUrl] = useState(() => envUrl || localStorage.getItem('sf_supabase_url') || '');
  const [sbKey, setSbKey] = useState(() => envKey || localStorage.getItem('sf_supabase_key') || '');
  const [dbConnected, setDbConnected] = useState(Boolean(envUrl && envKey));
  const [isSyncingDb, setIsSyncingDb] = useState(false);

  // 상품 & 주문 데이터
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('sf_products_v2');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('sf_direct_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [bankAccountInfo, setBankAccountInfo] = useState(
    () => localStorage.getItem('sf_bank_info') || '카카오뱅크 3333-00-0000000 (예금주: 숏픽스토어)'
  );

  // 모달 & 토스트
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  useEffect(() => {
    localStorage.setItem('sf_products_v2', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('sf_direct_orders', JSON.stringify(orders));
  }, [orders]);

  // Supabase 데이터 동기화
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
        setProducts(fetchedProducts);
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

  // 초기 접속 시 DB 동기화 및 ?shop=번호 URL 직행 라우팅 처리
  useEffect(() => {
    const init = async () => {
      if (sbUrl && sbKey) {
        await syncSupabase(sbUrl, sbKey);
      }
      const params = new URLSearchParams(window.location.search);
      const shopVideoNum = params.get('shop');
      const ref = params.get('ref');
      if (ref) setRefPlatform(ref);

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

  // 직접 판매 전용 페이지 열기
  const handleOpenDirectShop = (item) => {
    setSelectedShopProduct(item);
    setActiveTab('shop');
    const videoNum = item.shortform_posts?.video_number;
    if (videoNum) {
      window.history.replaceState({}, '', `?shop=${videoNum}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 메인 스토어로 복귀
  const handleBackToStore = () => {
    setSelectedShopProduct(null);
    setActiveTab('store');
    window.history.replaceState({}, '', window.location.pathname);
  };

  // 인스타/쇼츠 직행 판매 URL 복사
  const handleCopyShopLink = (item) => {
    const videoNum = item.shortform_posts?.video_number || '';
    const link = `${window.location.origin}/?shop=${videoNum}&ref=instagram`;
    navigator.clipboard?.writeText(link);
    showToast(`🔗 #${videoNum}번 상품 전용 판매 링크가 복사되었습니다!`);
  };

  // 고객 직접 주문 접수 처리
  const handleSubmitOrder = async (newOrder) => {
    if (dbConnected && sbUrl && sbKey) {
      await apiCreateDirectOrder(sbUrl, sbKey, newOrder);
      await syncSupabase();
    } else {
      setOrders((prev) => [newOrder, ...prev]);
    }
    showToast('✅ 주문이 정상 접수되었습니다!');
  };

  // 관리자 주문 상태 변경
  const handleUpdateOrderStatus = async (order, nextStatus) => {
    if (dbConnected && sbUrl && sbKey && order.id) {
      await apiUpdateOrderStatus(sbUrl, sbKey, order.id, nextStatus);
      await syncSupabase();
    } else {
      setOrders((prev) =>
        prev.map((o) =>
          o.order_number === order.order_number ? { ...o, order_status: nextStatus } : o
        )
      );
    }
    showToast('✅ 주문 처리 상태가 변경되었습니다.');
  };

  // 상품 등록 및 수정 저장
  const handleSaveProduct = async (formData) => {
    if (editingItem) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingItem.id
            ? {
                ...p,
                sale_type: formData.saleType,
                name: formData.name,
                price: formData.price,
                options: formData.options,
                image_url: formData.imageUrl || p.image_url,
                purchase_url: formData.purchaseUrl,
                badge_text: formData.badgeText,
                description: formData.description,
                shortform_posts: {
                  ...p.shortform_posts,
                  video_number: formData.videoNumber,
                  platform: formData.platform,
                  title: formData.videoTitle,
                  video_url: formData.videoUrl,
                  ai_summary: formData.aiSummary,
                  tags: formData.tags,
                },
              }
            : p
        )
      );
      showToast('✅ 상품 정보가 수정되었습니다.');
    } else {
      const postId = `post-${Date.now()}`;
      const newEntry = {
        id: `local-${Date.now()}`,
        post_id: postId,
        item_code: `${formData.videoNumber}-A`,
        sale_type: formData.saleType,
        name: formData.name,
        description: formData.description,
        price: formData.price,
        options: formData.options,
        image_url:
          formData.imageUrl ||
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&q=80',
        purchase_url: formData.purchaseUrl,
        badge_text: formData.badgeText,
        click_count: 0,
        shortform_posts: {
          id: postId,
          video_number: formData.videoNumber,
          platform: formData.platform,
          title: formData.videoTitle,
          video_url: formData.videoUrl,
          ai_summary: formData.aiSummary,
          tags: formData.tags,
        },
      };
      setProducts((prev) => [newEntry, ...prev]);
      showToast(`🎉 #${formData.videoNumber}번 상품이 등록되었습니다!`);
    }
    setShowProductModal(false);
  };

  // 상품 삭제
  const handleDeleteProduct = (item) => {
    if (!window.confirm(`'[#${item.shortform_posts?.video_number || '-'}번] ${item.name}' 상품을 삭제하시겠습니까?`)) {
      return;
    }
    setProducts((prev) => prev.filter((p) => p.id !== item.id));
    showToast('🗑️ 상품이 삭제되었습니다.');
  };

  // 클릭 수 증가
  const handleProductClick = (item) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === item.id ? { ...p, click_count: (p.click_count || 0) + 1 } : p))
    );
  };

  const nextVideoNumber = String(
    products.reduce((max, p) => Math.max(max, Number(p.shortform_posts?.video_number || 0)), 104) + 1
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
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={handleBackToStore} className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-zinc-900 text-amber-400 flex items-center justify-center font-black text-sm">
              #
            </span>
            <span className="font-black text-base tracking-tight">SHORTPICK</span>
          </button>

          {/* 우측 관리자 버튼 */}
          <div className="flex items-center gap-1.5">
            {!isAdmin ? (
              <button
                onClick={() => {
                  setPinInput('');
                  setPinError('');
                  setShowPinModal(true);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-bold"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>관리자</span>
              </button>
            ) : (
              <>
                <button
                  onClick={() => setActiveTab(activeTab === 'admin' ? 'store' : 'admin')}
                  className={`inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold ${
                    activeTab === 'admin'
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>{activeTab === 'admin' ? '스토어 보기' : '관리자 홈'}</span>
                </button>
                <button
                  onClick={() => {
                    setEditingItem(null);
                    setShowProductModal(true);
                  }}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs font-extrabold"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>상품 등록</span>
                </button>
                <button
                  onClick={() => {
                    setIsAdmin(false);
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
          isAdmin={isAdmin}
          onProductClick={handleProductClick}
          onOpenDirectShop={handleOpenDirectShop}
          onEditProduct={(item) => {
            setEditingItem(item);
            setShowProductModal(true);
          }}
          onDeleteProduct={handleDeleteProduct}
          onCopyShopLink={handleCopyShopLink}
        />
      )}

      {activeTab === 'shop' && (
        <DirectShopView
          product={selectedShopProduct}
          refPlatform={refPlatform}
          bankAccountInfo={bankAccountInfo}
          onBackToStore={handleBackToStore}
          onSubmitOrder={handleSubmitOrder}
          onShowToast={showToast}
        />
      )}

      {activeTab === 'admin' && isAdmin && (
        <AdminDashboard
          products={products}
          orders={orders}
          dbConnected={dbConnected}
          isSyncingDb={isSyncingDb}
          sbUrl={sbUrl}
          sbKey={sbKey}
          setSbUrl={setSbUrl}
          setSbKey={setSbKey}
          adminPin={adminPin}
          bankAccountInfo={bankAccountInfo}
          onSaveBankAccount={(val) => {
            setBankAccountInfo(val);
            localStorage.setItem('sf_bank_info', val);
            showToast('✅ 입금 계좌 안내 문구가 저장되었습니다.');
          }}
          onConnectSupabase={async (e) => {
            e.preventDefault();
            const ok = await syncSupabase(sbUrl, sbKey);
            if (ok) {
              localStorage.setItem('sf_supabase_url', sbUrl);
              localStorage.setItem('sf_supabase_key', sbKey);
              showToast('✅ Supabase DB와 연결되었습니다!');
            } else {
              showToast('❌ 연결 실패: URL과 키를 확인해 주세요.');
            }
          }}
          onSyncSupabase={() => syncSupabase()}
          onChangePin={(newPin) => {
            if (newPin.trim().length < 4) return;
            setAdminPin(newPin.trim());
            localStorage.setItem('sf_admin_pin', newPin.trim());
            showToast('✅ 관리자 PIN 비밀번호가 변경되었습니다.');
          }}
          onOpenNewProduct={() => {
            setEditingItem(null);
            setShowProductModal(true);
          }}
          onEditProduct={(item) => {
            setEditingItem(item);
            setShowProductModal(true);
          }}
          onDeleteProduct={handleDeleteProduct}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onLockAdmin={() => {
            setIsAdmin(false);
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
              <button onClick={() => setShowPinModal(false)} className="p-1.5 rounded-xl hover:bg-zinc-100">
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

      {/* 상품 등록/수정 모달 */}
      {showProductModal && isAdmin && (
        <ProductFormModal
          editingItem={editingItem}
          defaultVideoNumber={nextVideoNumber}
          onClose={() => setShowProductModal(false)}
          onSave={handleSaveProduct}
          onShowToast={showToast}
        />
      )}
    </div>
  );
}