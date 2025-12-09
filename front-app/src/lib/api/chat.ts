import { getIdToken } from "../firebaseConfig";
import { getBaseUrl } from "./client";

export interface Message {
  id: string;
  chat_room_id: string;
  sender_id: string;
  content: string;
  created_at: string;
}

export interface ChatRoomInfo {
  room_id: string;
  buyer_id: string;
  buyer_name: string;
  buyer_image_url: string;
  created_at: string;
}

export interface ChatRoom {
  id: string;
  item_id: string;
  buyer_id: string;
  seller_id: string;
  created_at: string;
}

// チャットルームを取得または作成（購入者用）
export const getOrCreateChatRoom = async (itemId: string, sellerId: string): Promise<ChatRoom> => {
  const token = await getIdToken();
  const res = await fetch(`${getBaseUrl()}/items/${itemId}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ seller_id: sellerId }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || "チャットルームの開始に失敗しました");
  }
  return res.json();
};

// チャット一覧を取得（出品者用）
export const getChatRoomList = async (itemId: string): Promise<ChatRoomInfo[]> => {
  const token = await getIdToken();
  const res = await fetch(`${getBaseUrl()}/items/${itemId}/chat_rooms`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    throw new Error("チャット一覧の取得に失敗しました");
  }
  const json = await res.json();
  return json.rooms || [];
};

// メッセージ一覧取得
export const getMessages = async (roomId: string): Promise<Message[]> => {
  const token = await getIdToken();
  const res = await fetch(`${getBaseUrl()}/chats/${roomId}/messages`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    throw new Error("メッセージの取得に失敗しました");
  }
  const json = await res.json();
  return json.messages || [];
};

// メッセージ送信
export const sendMessage = async (roomId: string, content: string): Promise<void> => {
  const token = await getIdToken();
  const res = await fetch(`${getBaseUrl()}/chats/${roomId}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
  });

  if (!res.ok) {
    throw new Error("メッセージの送信に失敗しました");
  }
};