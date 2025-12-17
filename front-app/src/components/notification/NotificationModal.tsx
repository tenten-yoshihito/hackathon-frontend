// src/components/notification/NotificationModal.tsx

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "hooks/useNotifications";
import { markAsRead, markAllAsRead } from "lib/api/notification";
import type { Notification } from "lib/api/notification";
import styles from "./NotificationModal.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onUpdateUnreadCount: () => void;
}

const NotificationModal: React.FC<Props> = ({ isOpen, onClose, onUpdateUnreadCount }) => {
  const { notifications, loadNotifications } = useNotifications();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      loadNotifications();
    }
  }, [isOpen, loadNotifications]);

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.is_read) {
      // バックエンドの更新を待つ
      await markAsRead(notification.id);
      
      // 更新完了後に最新の情報を取得
      await Promise.all([loadNotifications(), onUpdateUnreadCount()]);
    }
    navigate(`/items/${notification.item_id}`);
    onClose();
  };

  const handleMarkAllAsRead = async () => {
    // バックエンドに反映
    await markAllAsRead();
    // 通知一覧と未読数を取得し直す
    await Promise.all([loadNotifications(), onUpdateUnreadCount()]);
  };

  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "たった今";
    if (minutes < 60) return `${minutes}分前`;
    if (hours < 24) return `${hours}時間前`;
    return `${days}日前`;
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>通知</h2>
          <div className={styles.headerButtons}>
            {notifications.some((n) => !n.is_read) && (
              <button className={styles.markAllButton} onClick={handleMarkAllAsRead}>
                すべて既読
              </button>
            )}
            <button className={styles.closeButton} onClick={onClose}>
              ✕
            </button>
          </div>
        </div>
        <div className={styles.list}>
          {notifications.length === 0 ? (
            <div className={styles.empty}>通知はありません</div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`${styles.item} ${!n.is_read ? styles.unread : ""}`}
                onClick={() => handleNotificationClick(n)}
              >
                <div className={styles.icon}>
                  {n.type === "purchase" ? "🛒" : "💬"}
                </div>
                <div className={styles.content}>
                  <div className={styles.message}>{n.message}</div>
                  <div className={styles.time}>{formatTime(n.created_at)}</div>
                </div>
                {!n.is_read && <div className={styles.unreadDot} />}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationModal;
