// src/lib/api/notification.ts

import { getIdToken } from "../firebaseConfig";
import { getBaseUrl } from "./client";

export interface Notification {
  id: string;
  user_id: string;
  type: "purchase" | "comment";
  item_id: string;
  item_name: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export const getNotifications = async (): Promise<Notification[]> => {
  const token = await getIdToken();
  const res = await fetch(`${getBaseUrl()}/notifications`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("通知の取得に失敗しました");
  return res.json();
};

export const getUnreadCount = async (): Promise<number> => {
  const token = await getIdToken();
  const res = await fetch(`${getBaseUrl()}/notifications/unread`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("未読数の取得に失敗しました");
  const data = await res.json();
  return data.unread_count;
};

export const markAsRead = async (notificationId: string): Promise<void> => {
  const token = await getIdToken();
  await fetch(`${getBaseUrl()}/notifications/${notificationId}/read`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const markAllAsRead = async (): Promise<void> => {
  const token = await getIdToken();
  await fetch(`${getBaseUrl()}/notifications/read-all`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });
};
