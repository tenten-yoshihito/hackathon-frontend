// src/hooks/useNotifications.ts

import { useState, useEffect, useCallback } from "react";
import {
  getNotifications,
  getUnreadCount,
  Notification,
} from "lib/api/notification";
import { useAuth } from "./useAuth";

export const useNotifications = () => {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadNotifications = useCallback(async () => {
    if (!currentUser) return;
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (error) {
      console.error(error);
    }
  }, [currentUser]);

  const loadUnreadCount = useCallback(async () => {
    if (!currentUser) {
      setLoading(false);
      return;
    }
    
    try {
      const count = await getUnreadCount();
      setUnreadCount(count);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;
    
    loadUnreadCount();
    // 30秒ごとに未読数を更新
    const interval = setInterval(loadUnreadCount, 30000);
    return () => clearInterval(interval);
  }, [loadUnreadCount, currentUser]);

  return {
    notifications,
    unreadCount,
    loading,
    loadNotifications,
    loadUnreadCount,
  };
};
