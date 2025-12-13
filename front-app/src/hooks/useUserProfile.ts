// src/hooks/useUserProfile.ts

import { useState, useEffect } from "react";
import { fetchUser, User } from "lib/api/user";
import { getUserItems } from "lib/api/user_items";
import { ItemSimple } from "lib/api/my_items";

export const useUserProfile = (userId: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [items, setItems] = useState<ItemSimple[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // ユーザー情報と商品を並列で取得
        const [userData, itemsData] = await Promise.all([
          fetchUser(userId),
          getUserItems(userId),
        ]);

        setUser(userData);
        setItems(itemsData);
      } catch (err) {
        console.error("Failed to load profile:", err);
        setError("プロフィールの読み込みに失敗しました");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [userId]);

  return { user, items, loading, error };
};
