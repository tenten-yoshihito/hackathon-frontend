// src/pages/Home.tsx

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { fetchItems, ItemSimple } from "lib/api/item_list";
import { getLikedItems } from "lib/api/like";
import { useMyItems } from "hooks/useMyItems";
import { useLikes } from "hooks/useLikes";
import ItemGrid from "components/items/ItemGrid";
import TabNavigation from "components/common/TabNavigation";
import styles from "./Home.module.css";

type StatusFilter = "all" | "on_sale";
type SortOption = "newest" | "price_low" | "price_high";

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"all" | "my" | "liked">("all");
  const [allItems, setAllItems] = useState<ItemSimple[]>([]);
  const [likedItems, setLikedItems] = useState<ItemSimple[]>([]);
  const [loadingAll, setLoadingAll] = useState(true);
  const [loadingLiked, setLoadingLiked] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const { items: myItems, loading: loadingMy } = useMyItems();
  const { likedItemIds, toggleLike, checkIsLiked } = useLikes();

  // Removed unused useEffect/loadItems block


  // Moved functions up to avoid "used before declaration" errors
  const fetchData = useCallback(async (currentOffset: number) => {
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

  // Initial load is handled by the "Reset logic" useEffect below.

  // Reset logic when tab changes
  useEffect(() => {
    if (activeTab === "all") {
      setOffset(0);
      setAllItems([]);
      setHasMore(true);
      fetchData(0); 
    }
  }, [activeTab, fetchData]);

  const handleLoadMore = () => {
    fetchData(offset + 20); 
    setOffset(prev => prev + 20);
  };
  
  // Wait, mixing logic in replacement chunk is hard. I'll rewrite the whole block.


  // いいねタブが選択されたときにいいね商品を取得
  useEffect(() => {
    if (activeTab === "liked") {
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
  }, [activeTab]);

  const displayItems =
    activeTab === "all" ? allItems : activeTab === "my" ? myItems : likedItems;
  const loading =
    activeTab === "all"
      ? loadingAll
      : activeTab === "my"
      ? loadingMy
      : loadingLiked;

  // フィルターとソートを適用
  const filteredAndSortedItems = useMemo(() => {
    let result = [...displayItems];

    // ステータスフィルター
    if (statusFilter === "on_sale") {
      result = result.filter((item) => item.status === "ON_SALE");
    }

    // ソート
    switch (sortOption) {
      case "price_low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price_high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
      default:
        // 既に新着順なのでそのまま
        break;
    }

    return result;
  }, [displayItems, statusFilter, sortOption]);

  return (
    <div className="container-lg">
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      <div className={styles.contentWrapper}>
        {/* 左側: フィルター・ソート */}
        <aside className={styles.sidebar}>
          {/* ステータスフィルター */}
          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>表示</h3>
            <label className={styles.filterOption}>
              <input
                type="radio"
                name="status"
                value="all"
                checked={statusFilter === "all"}
                onChange={() => setStatusFilter("all")}
              />
              <span>全て表示</span>
            </label>
            <label className={styles.filterOption}>
              <input
                type="radio"
                name="status"
                value="on_sale"
                checked={statusFilter === "on_sale"}
                onChange={() => setStatusFilter("on_sale")}
              />
              <span>販売中のみ</span>
            </label>
          </div>

          {/* ソート */}
          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>並び替え</h3>
            <label className={styles.filterOption}>
              <input
                type="radio"
                name="sort"
                value="newest"
                checked={sortOption === "newest"}
                onChange={() => setSortOption("newest")}
              />
              <span>新着順</span>
            </label>
            <label className={styles.filterOption}>
              <input
                type="radio"
                name="sort"
                value="price_low"
                checked={sortOption === "price_low"}
                onChange={() => setSortOption("price_low")}
              />
              <span>価格が安い順</span>
            </label>
            <label className={styles.filterOption}>
              <input
                type="radio"
                name="sort"
                value="price_high"
                checked={sortOption === "price_high"}
                onChange={() => setSortOption("price_high")}
              />
              <span>価格が高い順</span>
            </label>
          </div>
        </aside>

        {/* 右側: 商品一覧 */}
        <main className={styles.mainContent}>
          {loading ? (
            <p className="center-text">読み込み中...</p>
          ) : (
            <>
              <ItemGrid
                items={filteredAndSortedItems}
                likedItemIds={likedItemIds}
                onLikeClick={toggleLike}
                checkIsLiked={checkIsLiked}
              />
              
              {/* Load More Button for 'all' tab */}
              {activeTab === "all" && hasMore && (
                <div style={{ textAlign: "center", marginTop: "24px" }}>
                  <button 
                    className="secondary-button" 
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                  >
                    {loadingMore ? "読み込み中..." : "もっと見る"}
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;
