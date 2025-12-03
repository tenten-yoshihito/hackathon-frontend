// src/pages/ItemDetailPage.tsx

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useItemDetail } from "hooks/useItemDetail";
import { purchaseItem } from "lib/api/purchase";

// 🧩 部品たち
import ImageCarousel from "components/items/ImageCarousel";
import ItemDescription from "components/items/ItemDescription";
import ItemDetailFooter from "components/items/ItemDetailFooter";
import PurchaseModal from "components/items/PurchaseModal";

import styles from "./ItemDetailPage.module.css";

const ItemDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // ロジックはフックに任せる
  const { item, loading, error, refetch } = useItemDetail(id);
  
  const [showModal, setShowModal] = useState(false);
  const [purchasing, setPurchasing] = useState(false);

  const handlePurchaseClick = () => {
    setShowModal(true);
  };

  const handleConfirmPurchase = async () => {
    if (!item) return;
    
    setPurchasing(true);
    try {
      await purchaseItem(item.id);
      alert("購入が完了しました!");
      refetch(); // 商品情報を再取得してSOLD表示を更新
      setShowModal(false);
    } catch (err: any) {
      alert(err.message || "購入に失敗しました");
    } finally {
      setPurchasing(false);
    }
  };

  if (loading) return <p className="center-text">読み込み中...</p>;
  if (error || !item)
    return <p className="center-text">商品が見つかりません</p>;

  const isSold = item.status === "SOLD";

  return (
    <div
      className={`container-lg ${styles.container}`}
    >
      {/* 2カラムレイアウト (PC時) */}
      <div className={styles.contentWrapper}>
        {/* 左: 画像 */}
        <div className={styles.imageSection}>
          <div className={styles.imageWrapper}>
            {isSold && <div className="sold-badge">SOLD</div>}
            <ImageCarousel images={item.image_urls} alt={item.name} />
          </div>
        </div>

        {/* 右: 説明 */}
        <div className={styles.infoSection}>
          <ItemDescription item={item} />

          {/* フッターに隠れないための余白 */}
          <div className={styles.spacer} />
        </div>
      </div>

      {/* 下: フッター */}
      <ItemDetailFooter 
        onPurchaseClick={handlePurchaseClick}
        isSold={isSold}
      />

      {/* 購入確認モーダル */}
      {showModal && item && (
        <PurchaseModal
          item={item}
          onConfirm={handleConfirmPurchase}
          onCancel={() => setShowModal(false)}
          isLoading={purchasing}
        />
      )}
    </div>
  );
};

export default ItemDetailPage;
