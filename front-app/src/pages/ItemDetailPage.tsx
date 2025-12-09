// src/pages/ItemDetailPage.tsx

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useItemDetail } from "hooks/useItemDetail";
import { useItemPurchase } from "hooks/useItemPurchase";
import { useItemChat } from "hooks/useItemChat";
import { fireAuth } from "lib/firebaseConfig";

// コンポーネント
import ImageCarousel from "components/items/ImageCarousel";
import ItemDescription from "components/items/ItemDescription";
import ItemDetailFooter from "components/items/ItemDetailFooter";
import PurchaseModal from "components/items/PurchaseModal";
import ChatListModal from "components/items/ChatListModal";

import styles from "./ItemDetailPage.module.css";

const ItemDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { item, loading, error, refetch } = useItemDetail(id);

  // 購入ロジックをカスタムフックに委譲
  const purchase = useItemPurchase({ item, refetch });

  // チャットロジックをカスタムフックに委譲
  const chat = useItemChat({ item });

  // 現在のユーザーと商品の出品者を比較
  const currentUser = fireAuth.currentUser;
  const isOwnItem = item ? item.user_id === currentUser?.uid : false;

  const handleEditClick = () => {
    if (item) {
      navigate(`/items/${item.id}/edit`);
    }
  };

  if (loading) return <p className="center-text">読み込み中...</p>;
  if (error || !item)
    return <p className="center-text">商品が見つかりません</p>;

  const isSold = item.status === "SOLD";

  return (
    <div className={`container-lg ${styles.container}`}>
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
          <div className={styles.spacer} />
        </div>
      </div>

      {/* 下: フッター */}
      <ItemDetailFooter
        onPurchaseClick={purchase.handlePurchaseClick}
        onEditClick={handleEditClick}
        onCommentClick={chat.onCommentClick}
        isSold={isSold}
        isOwnItem={isOwnItem}
      />

      {/* 購入確認モーダル */}
      {purchase.showModal && item && (
        <PurchaseModal
          item={item}
          onConfirm={purchase.handleConfirmPurchase}
          onCancel={purchase.closeModal}
          isLoading={purchase.purchasing}
        />
      )}

      {/* チャット一覧モーダル */}
      {chat.showChatListModal && (
        <ChatListModal
          rooms={chat.chatList}
          onSelectRoom={chat.openChatRoom}
          onClose={chat.closeChatListModal}
        />
      )}
    </div>
  );
};

export default ItemDetailPage;
