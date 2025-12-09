// src/hooks/useChatRoom.ts

import { useState, useEffect, useCallback } from "react";
import {
  getMessages,
  sendMessage as sendMessageAPI,
  Message,
} from "lib/api/chat";

interface UseChatRoomProps {
  roomId: string | undefined;
}

export const useChatRoom = ({ roomId }: UseChatRoomProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);

  // メッセージを取得
  const fetchLatestMessages = useCallback(async () => {
    if (!roomId) return;
    try {
      const data = await getMessages(roomId);
      setMessages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [roomId]);

  // ポーリング設定 (3秒ごとに更新)
  useEffect(() => {
    fetchLatestMessages();
    const intervalId = setInterval(fetchLatestMessages, 3000);
    return () => clearInterval(intervalId);
  }, [fetchLatestMessages, roomId]);

  // メッセージを送信
  const sendMessage = async () => {
    if (!inputText.trim() || !roomId || sending) return;

    setSending(true);
    try {
      await sendMessageAPI(roomId, inputText);
      setInputText("");
      await fetchLatestMessages(); // 即時反映
    } catch (err) {
      alert("送信に失敗しました");
    } finally {
      setSending(false);
    }
  };

  return {
    messages,
    loading,
    inputText,
    setInputText,
    sending,
    sendMessage,
  };
};
