import React from "react";
import { ChatRoomInfo } from "lib/api/chat";
import styles from "./PurchaseModal.module.css";

// デフォルトアイコン（必要に応じて変更してください）
const defaultIcon = "https://placehold.jp/40x40.png?text=NoImg";

interface Props {
  rooms: ChatRoomInfo[];
  onSelectRoom: (roomId: string) => void;
  onClose: () => void;
}

const ChatListModal: React.FC<Props> = ({ rooms, onSelectRoom, onClose }) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>お問い合わせ一覧</h2>

        {rooms.length === 0 ? (
          <p className="center-text">まだお問い合わせはありません</p>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {rooms.map((room) => (
              <button
                key={room.room_id}
                className="secondary-button w-full"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  textAlign: "left",
                  padding: "12px",
                }}
                onClick={() => onSelectRoom(room.room_id)}
              >
                {/* アイコン */}
                <img
                  src={room.buyer_image_url || defaultIcon}
                  alt={room.buyer_name}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "1px solid #eee",
                  }}
                />

                {/* 名前と日付 */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: "bold" }}>
                    {room.buyer_name || "ゲストユーザー"}
                  </div>
                  <div style={{ fontSize: "12px", color: "#888" }}>
                    {new Date(room.created_at).toLocaleDateString()}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        <div className={styles.buttons} style={{ marginTop: "20px" }}>
          <button
            className={`secondary-button ${styles.button}`}
            onClick={onClose}
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatListModal;
