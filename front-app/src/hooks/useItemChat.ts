// src/hooks/useItemChat.ts

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fireAuth } from "lib/firebaseConfig";
import {
  getOrCreateChatRoom,
  getChatRoomList,
  ChatRoomInfo,
} from "lib/api/chat";
import { ItemDetail } from "lib/api/item_detail";

interface UseItemChatProps {
  item: ItemDetail | null;
}

export const useItemChat = ({ item }: UseItemChatProps) => {
  const navigate = useNavigate();
  const [chatList, setChatList] = useState<ChatRoomInfo[]>([]);
  const [showChatListModal, setShowChatListModal] = useState(false);

  // 現在のユーザーと商品の出品者を比較
  const currentUser = fireAuth.currentUser;
  const isOwnItem = item ? item.user_id === currentUser?.uid : false;

  // コメントボタンが押された時の処理
  const onCommentClick = async () => {
    if (!currentUser) {
      alert("ログインしてください");
      navigate("/login");
      return;
    }
    if (!item) return;

    try {
      if (isOwnItem) {
        // 出品者の場合: 一覧を取得してモーダル表示
        const rooms = await getChatRoomList(item.id);
        setChatList(rooms);
        setShowChatListModal(true);
      } else {
        // 購入者の場合: チャットルームへ遷移
        const room = await getOrCreateChatRoom(item.id, item.user_id);
        navigate(`/chats/${room.id}`);
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message || "チャットの読み込みに失敗しました");
    }
  };

  // モーダルを閉じる
  const closeChatListModal = () => {
    setShowChatListModal(false);
  };

  // チャットルームを選択して遷移
  const openChatRoom = (roomId: string) => {
    navigate(`/chats/${roomId}`);
  };

  return {
    onCommentClick,
    chatList,
    showChatListModal,
    closeChatListModal,
    openChatRoom,
  };
};
