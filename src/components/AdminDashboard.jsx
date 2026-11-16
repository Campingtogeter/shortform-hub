// src/components/AdminDashboard.jsx
import React, { useState } from 'react';
import {
  ShieldCheck,
  Plus,
  Lock,
  Package,
  MousePointerClick,
  Database,
  RefreshCw,
  KeyRound,
  BarChart3,
  Edit3,
  Trash2,
  ShoppingBag,
  Building2,
} from 'lucide-react';

export default function AdminDashboard({
  products,
  orders,
  dbConnected,
  isSyncingDb,
  sbUrl,
  sbKey,
  setSbUrl,
  setSbKey,
  adminPin,
  bankAccountInfo,
  onSaveBankAccount,
  onConnectSupabase,
  onSyncSupabase,
  onChangePin,
  onOpenNewProduct,
  onEditProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
  onLockAdmin,
}) {
  const [newPinInput, setNewPinInput] = useState('');
  const [bankInput, setBankInput] = useState(bankAccountInfo || '');
  const [adminSubTab, setAdminSubTab] = useState('orders'); // 'orders' | 'products' | 'settings'

  const totalClicks = products.reduce((sum, item) => sum + (item.click_count || 0), 0);
  const totalSalesAmount = orders.reduce((sum, o) => sum + (Number(o.total_price) || 0), 0);

  return (
    <main className="max-w-5xl mx-auto px-4 pt-6 space-y-6">
      {/* 상단 관리자 헤더 배너 */}
      <div className="bg-zinc-900 text-white rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" /> 관리자 모드 활성화됨
          </div>
          <h1 className="text-xl font-black">숏폼 커머스 통합 제어 센터</h1>
          <p className="text-xs text-zinc-400 mt-1">
            상품 등록, 자체 판매 주문 접수 현황, Supabase DB 연동 및 입금 계좌를 관리합니다.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenNewProduct}
            className="inline-flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs font-black shadow"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" /> 새 상품 등록
          </button>
          <button
            onClick={onLockAdmin}
            className="inline-flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold"
          >
            <Lock className="w-4 h-4" /> 잠금
          </button>
        </div>
      </div>

      {/* 상단 핵심 요약 지표 4종 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm">
          <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-500">
            <ShoppingBag className="w-4 h-4 text-emerald-600" /> 직접 판매 주문
          </div>
          <p className="text-2xl font-black text-emerald-600 mt-1.5">{orders.length}건</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm">
          <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-500">
            <Package className="w-4 h-4 text-zinc-900" /> 등록된 상품 수
          </div>
          <p className="text-2xl font-black mt-1.5">{products.length}개</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm">
          <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-500">
            <MousePointerClick className="w-4 h-4 text-blue-600" /> 누적 클릭 수
          </div>
          <p className="text-2xl font-black text-blue-600 mt-1.5">
            {totalClicks.toLocaleString()}회
          </p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm">
          <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-500">
            <Database className="w-4 h-4 text-indigo-600" /> 누적 주문 금액
          </div>
          <p className="text-xl font-black text-zinc-900 mt-2">
            {totalSalesAmount.toLocaleString()}원
          </p>
        </div>
      </div>

      {/* 관리자 내부 서브 탭 전환 */}
      <div className="flex gap-2 border-b border-zinc-200 pb-3">
        {[
          { id: 'orders', label: `📦 직접 판매 주문 내역 (${orders.length})` },
          { id: 'products', label: `🏷️ 등록 상품 관리 (${products.length})` },
          { id: 'settings', label: '⚙️ DB · 입금계좌 · PIN 설정' },
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

      {/* SUB-TAB 1: 자체 상품 판매 주문 접수 및 배송 관리 */}
      {adminSubTab === 'orders' && (
        <section className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold">실시간 고객 주문 접수 목록</h2>
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
              아직 접수된 직접 판매 주문 내역이 없습니다.
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((order) => (
                <div
                  key={order.id || order.order_number}
                  className="p-4 rounded-2xl border border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {order.order_number}
                      </span>
                      <span className="text-[11px] font-bold text-zinc-500">
                        유입: {order.referrer_platform || 'shortform'}
                      </span>
                    </div>
                    <p className="text-sm font-extrabold text-zinc-900">
                      {order.product_name} ({order.selected_option} / {order.quantity}개)
                    </p>
                    <p className="text-xs text-zinc-600">
                      받는분: <strong>{order.buyer_name}</strong> ({order.buyer_phone}) |{' '}
                      {order.shipping_address}
                    </p>
                    {order.delivery_memo && (
                      <p className="text-[11px] text-zinc-400">메모: {order.delivery_memo}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-zinc-100">
                    <span className="text-sm font-black text-zinc-900">
                      {Number(order.total_price).toLocaleString()}원
                    </span>
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
                      <option value="pending_payment">입금 대기</option>
                      <option value="paid">입금 완료 (발송준비)</option>
                      <option value="shipped">발송 완료</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* SUB-TAB 2: 등록된 상품 목록 & 클릭 순위 */}
      {adminSubTab === 'products' && (
        <section className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-base font-extrabold flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-zinc-900" />
              등록 상품 목록 및 클릭 현황
            </h2>
            <button
              onClick={onOpenNewProduct}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              + 새 상품 등록
            </button>
          </div>

          {[...products]
            .sort((a, b) => (b.click_count || 0) - (a.click_count || 0))
            .map((item) => {
              const post = item.shortform_posts;
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
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="px-2 py-0.5 bg-zinc-900 text-white rounded text-[11px] font-black">
                          #{post?.video_number || '-'}번
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            item.sale_type === 'direct'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-zinc-100 text-zinc-700'
                          }`}
                        >
                          {item.sale_type === 'direct' ? '자체 직접판매' : '외부 제휴링크'}
                        </span>
                      </div>
                      <p className="text-sm font-extrabold text-zinc-900 truncate">{item.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <div className="bg-blue-50 px-3 py-1.5 rounded-xl text-center">
                      <span className="block text-[10px] font-bold text-blue-600">클릭 수</span>
                      <span className="text-sm font-black text-blue-700">
                        {(item.click_count || 0).toLocaleString()}회
                      </span>
                    </div>
                    <button
                      onClick={() => onEditProduct(item)}
                      className="p-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteProduct(item)}
                      className="p-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
        </section>
      )}

      {/* SUB-TAB 3: Supabase DB, 무통장 입금 계좌, PIN 설정 */}
      {adminSubTab === 'settings' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Supabase DB 연결 */}
          <form
            onSubmit={onConnectSupabase}
            className="bg-white rounded-2xl border border-zinc-200 p-5 space-y-3 shadow-sm"
          >
            <h2 className="text-sm font-extrabold flex items-center gap-1.5">
              <Database className="w-4 h-4 text-emerald-600" />
              Supabase 실시간 데이터베이스 연결
            </h2>
            <p className="text-[11px] text-zinc-500">
              상태: {dbConnected ? '● 실시간 연결됨' : '● 로컬 저장 모드'}
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

          {/* 무통장 입금 계좌 및 관리자 PIN 변경 */}
          <div className="space-y-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSaveBankAccount(bankInput);
              }}
              className="bg-white rounded-2xl border border-zinc-200 p-5 space-y-2.5 shadow-sm"
            >
              <h2 className="text-sm font-extrabold flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-zinc-900" />
                직접 판매 무통장 입금 계좌 안내 문구
              </h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={bankInput}
                  onChange={(e) => setBankInput(e.target.value)}
                  placeholder="예: 카카오뱅크 3333-00-0000000 (예금주: 홍길동)"
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