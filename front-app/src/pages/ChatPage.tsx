import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "hooks/useAuth";
import { getMessages, sendMessage, Message } from "lib/api/chat";
import styles from "./ChatPage.module.css";

const ChatPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [sending, setSending] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  // メッセージ取得
  const fetchLatestMessages = async () => {
    if (!roomId) return;
    try {
      const data = await getMessages(roomId);
      setMessages(data);
    } catch (err) {
      console.error(err);
    }
  };

  // ポーリング設定 (3秒ごと)
  useEffect(() => {
    fetchLatestMessages();
    const intervalId = setInterval(fetchLatestMessages, 3000);
    return () => clearInterval(intervalId);
  }, [roomId]);

  // 新着時にスクロール
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim() || !roomId || sending) return;

    setSending(true);
    try {
      await sendMessage(roomId, inputText);
      setInputText("");
      await fetchLatestMessages(); // 即時反映
    } catch (err) {
      alert("送信に失敗しました");
    } finally {
      setSending(false);
    }
  };

  // Enterキーで送信 (Shift+Enterで改行)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="container-sm">
      <h2 className="page-title">チャット</h2>

      <div className={styles.chatContainer}>
        <div className={styles.messageArea} ref={scrollRef}>
          {messages.map((msg) => {
            const isMyMessage = msg.sender_id === currentUser?.uid;
            return (
              <div
                key={msg.id}
                className={`${styles.messageRow} ${
                  isMyMessage ? styles.myMessage : styles.otherMessage
                }`}
              >
                <div
                  className={isMyMessage ? styles.myBubble : styles.otherBubble}
                >
                  {msg.content}
                </div>
                <span className={styles.timestamp}>
                  {new Date(msg.created_at).toLocaleString()}
                </span>
              </div>
            );
          })}
        </div>

        <div className={styles.inputArea}>
          <textarea
            className={styles.textarea}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="メッセージを入力..."
          />
          <button
            className={`primary-button ${styles.sendButton}`}
            onClick={handleSend}
            disabled={sending || !inputText.trim()}
          >
            送信
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
