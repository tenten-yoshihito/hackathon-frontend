// src/hooks/useLikes.ts

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./useAuth";
import { toggleLike as toggleLikeAPI, getLikedItemIDs } from "lib/api/like";

export const useLikes = () => {
  const { currentUser } = useAuth();
  const [likedItemIds, setLikedItemIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  // 初回ロード時にいいね済み商品IDを取得
  useEffect(() => {
    const loadLikedItemIDs = async () => {
      if (!currentUser) {
        setLikedItemIds(new Set());
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const ids = await getLikedItemIDs();
        setLikedItemIds(new Set(ids));
      } catch (err) {
        console.error("Failed to load liked item IDs:", err);
      } finally {
        setLoading(false);
      }
    };

    loadLikedItemIDs();
  }, [currentUser]);

  // いいねをトグル
  const toggleLike = useCallback(
    async (itemId: string) => {
      if (!currentUser) {
        alert("いいねするにはログインが必要です");
        return;
      }

      // UI更新
      const newLikedItemIds = new Set(likedItemIds);
      if (newLikedItemIds.has(itemId)) {
        newLikedItemIds.delete(itemId);
      } else {
        newLikedItemIds.add(itemId);
      }
      setLikedItemIds(newLikedItemIds);

      try {
        await toggleLikeAPI(itemId);
      } catch (err) {
        console.error("Failed to toggle like:", err);
        // エラー時は元に戻す
        setLikedItemIds(likedItemIds);
        alert("いいねの更新に失敗しました");
      }
    },
    [currentUser, likedItemIds]
  );

  // 指定した商品がいいね済みか判定
  const checkIsLiked = useCallback(
    (itemId: string): boolean => {
      return likedItemIds.has(itemId);
    },
    [likedItemIds]
  );

  return {
    likedItemIds,
    toggleLike,
    checkIsLiked,
    loading,
  };
};
