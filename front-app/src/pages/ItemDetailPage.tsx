// src/pages/ItemDetailPage.tsx

import React, { useState } from "react"; // useStateを追加
import { useParams, useNavigate } from "react-router-dom";
import { useItemDetail } from "hooks/useItemDetail";
import { useItemPurchase } from "hooks/useItemPurchase";
import { fireAuth } from "lib/firebaseConfig";
// ▼ 追加: getChatRoomList, ChatRoomInfo をインポート
import {
  getOrCreateChatRoom,
  getChatRoomList,
  ChatRoomInfo,
} from "lib/api/chat";

//  部品
import ImageCarousel from "components/items/ImageCarousel";
import ItemDescription from "components/items/ItemDescription";
import ItemDetailFooter from "components/items/ItemDetailFooter";
import PurchaseModal from "components/items/PurchaseModal";
import ChatListModal from "components/items/ChatListModal"; // ▼ 追加: 一覧モーダル

import styles from "./ItemDetailPage.module.css";

const ItemDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { item, loading, error, refetch } = useItemDetail(id);

  // 購入ロジックをカスタムフックに委譲
  const purchase = useItemPurchase({ item, refetch });

  // ▼ 追加: チャットリスト用state
  const [chatList, setChatList] = useState<ChatRoomInfo[]>([]);
  const [showChatList, setShowChatList] = useState(false);

  // 現在のユーザーと商品の出品者を比較
  const currentUser = fireAuth.currentUser;
  const isOwnItem = item ? item.user_id === currentUser?.uid : false;

  const handleEditClick = () => {
    if (item) {
      navigate(`/items/${item.id}/edit`);
    }
  };

  // コメントボタンが押された時の処理
  const handleCommentClick = async () => {
    if (!currentUser) {
      alert("ログインしてください");
      navigate("/login");
      return;
    }
    if (!item) return;

    try {
      if (isOwnItem) {
        // ★ 出品者の場合: 一覧を取得してモーダル表示
        const rooms = await getChatRoomList(item.id);
        setChatList(rooms);
        setShowChatList(true);
      } else {
        // ★ 購入者の場合: チャットルームへ
        const room = await getOrCreateChatRoom(item.id, item.user_id);
        navigate(`/chats/${room.id}`);
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message || "チャットの読み込みに失敗しました");
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
        onCommentClick={handleCommentClick}
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

      {/* ▼ 追加: チャット一覧モーダル */}
      {showChatList && (
        <ChatListModal
          rooms={chatList}
          onSelectRoom={(roomId) => navigate(`/chats/${roomId}`)}
          onClose={() => setShowChatList(false)}
        />
      )}
    </div>
  );
};

export default ItemDetailPage;
