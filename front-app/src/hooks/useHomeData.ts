import { useState, useEffect, useCallback } from "react";
import { fetchItems, ItemSimple } from "lib/api/item_list";
import { getLikedItems } from "lib/api/like";
import { getPersonalizedRecommendations } from "lib/api/recommend";
import { useMyItems } from "hooks/useMyItems";
import { useAuth } from "hooks/useAuth";

export type TabType = "all" | "my" | "liked" | "recommend";

export const useHomeData = (activeTab: TabType) => {
  const { currentUser } = useAuth();
  
  // 各タブのデータ
  const [allItems, setAllItems] = useState<ItemSimple[]>([]);
  const [likedItems, setLikedItems] = useState<ItemSimple[]>([]);
  const [recommendedItems, setRecommendedItems] = useState<ItemSimple[]>([]);
  
  // "出品した商品" は既存のフックを利用
  const { items: myItems, loading: loadingMy } = useMyItems();

  // Loading状態
  const [loadingAll, setLoadingAll] = useState(true);
  const [loadingLiked, setLoadingLiked] = useState(false);
  const [loadingRecommended, setLoadingRecommended] = useState(false);
  
  // ページネーション (for "all" tab)
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // --- 1. 新着商品 (All) の取得ロジック ---
  const fetchAllItems = useCallback(async (currentOffset: number) => {
    try {
      if (currentOffset === 0) setLoadingAll(true);
      else setLoadingMore(true);

      const limit = 20;
      const data = await fetchItems(limit, currentOffset);

      if (data.length < limit) setHasMore(false);
      
      setAllItems(prev => currentOffset === 0 ? data : [...prev, ...data]);
    } catch (err) {
      console.error(err);
    } finally {
        setLoadingAll(false);
        setLoadingMore(false);
    }
  }, []);

  // タブ切り替え時のリセット処理 (for "all")
  useEffect(() => {
    if (activeTab === "all" && allItems.length === 0) {
      setOffset(0);
      setHasMore(true);
      fetchAllItems(0); 
    }
  }, [activeTab, allItems.length, fetchAllItems]);

  const loadMore = () => {
    if (activeTab !== "all") return;
    const nextOffset = offset + 20;
    fetchAllItems(nextOffset); 
    setOffset(nextOffset);
  };

  // --- 2. いいね商品 (Liked) の取得ロジック ---
  useEffect(() => {
    if (activeTab === "liked" && likedItems.length === 0) { // キャッシュがない場合のみ取得
      const loadLikedItems = async () => {
        try {
          setLoadingLiked(true);
          const data = await getLikedItems();
          setLikedItems(data);
        } catch (err) {
          console.error("Failed to load liked items:", err);
        } finally {
          setLoadingLiked(false);
        }
      };
      loadLikedItems();
    }
  }, [activeTab, likedItems.length]);

  // --- 3. おすすめ商品 (Recommend) の取得ロジック ---
  useEffect(() => {
    if (activeTab === "recommend") {
      if (!currentUser) {
        setLoadingRecommended(false);
        setRecommendedItems([]);
        return;
      }

      if (recommendedItems.length > 0) {
        // キャッシュ済みなら何もしない
        return;
      }

      const loadRecommendedItems = async () => {
        try {
          setLoadingRecommended(true);
          const data = await getPersonalizedRecommendations();
          setRecommendedItems(data);
        } catch (err) {
          console.error("Failed to load recommended items:", err);
          setRecommendedItems([]);
        } finally {
          setLoadingRecommended(false);
        }
      };

      loadRecommendedItems();
    }
  }, [activeTab, currentUser, recommendedItems.length]);

  // 現在のタブに応じたデータを返す
  let displayItems: ItemSimple[] = [];
  let loading = false;

  switch (activeTab) {
    case "all":
      displayItems = allItems;
      loading = loadingAll;
      break;
    case "my":
      displayItems = myItems;
      loading = loadingMy;
      break;
    case "liked":
      displayItems = likedItems;
      loading = loadingLiked;
      break;
    case "recommend":
      displayItems = recommendedItems;
      loading = loadingRecommended;
      break;
  }

  return {
    displayItems,
    loading,
    hasMore,
    loadMore,
    loadingMore
  };
};
