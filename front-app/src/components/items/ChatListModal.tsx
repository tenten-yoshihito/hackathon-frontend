// src/components/items/ChatListModal.tsx

import React from "react";
import { ChatRoomInfo } from "lib/api/chat";
import { DEFAULT_USER_ICON } from "constants/images";
import styles from "./ChatListModal.module.css";

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
          <div className={styles.roomList}>
            {rooms.map((room) => (
              <button
                key={room.room_id}
                className={`secondary-button w-full ${styles.listItem}`}
                onClick={() => onSelectRoom(room.room_id)}
              >
                <img
                  src={room.buyer_image_url || DEFAULT_USER_ICON}
                  alt={room.buyer_name}
                  className={styles.userIcon}
                />

                <div className={styles.userInfo}>
                  <div className={styles.userName}>
                    {room.buyer_name || "ゲストユーザー"}
                  </div>
                  <div className={styles.createdDate}>
                    {new Date(room.created_at).toLocaleDateString()}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        <div className={styles.buttons}>
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
