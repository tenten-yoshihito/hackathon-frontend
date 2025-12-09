import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "hooks/useAuth";
import { useChatRoom } from "hooks/useChatRoom";
import styles from "./ChatPage.module.css";

const ChatPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { currentUser } = useAuth();
  
  // チャット通信ロジックをカスタムフックに委譲
  const chat = useChatRoom({ roomId });

  const scrollRef = useRef<HTMLDivElement>(null);

  // 新着メッセージがあるときにスクロール
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat.messages]);

  // Enterキーで送信 (Shift+Enterで改行)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      chat.sendMessage();
    }
  };

  return (
    <div className="container-sm">
      <h2 className="page-title">チャット</h2>

      <div className={styles.chatContainer}>
        <div className={styles.messageArea} ref={scrollRef}>
          {chat.messages.map((msg) => {
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
            value={chat.inputText}
            onChange={(e) => chat.setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="メッセージを入力..."
          />
          <button
            className={`primary-button ${styles.sendButton}`}
            onClick={chat.sendMessage}
            disabled={chat.sending || !chat.inputText.trim()}
          >
            送信
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
