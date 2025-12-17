// src/pages/SearchPage.tsx

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { searchItems } from "lib/api/item_list";
import { ItemSimple } from "types/item";
import { useLikes } from "hooks/useLikes";
import ItemGrid from "components/items/ItemGrid";
import styles from "./SearchPage.module.css";

type StatusFilter = "all" | "on_sale";
type SortOption = "newest" | "price_low" | "price_high";

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("name") || "";
  const [items, setItems] = useState<ItemSimple[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const { likedItemIds, toggleLike, checkIsLiked } = useLikes();

  const performSearch = useCallback(async (isLoadMore: boolean = false) => {
    if (!keyword) {
      setLoading(false);
      return;
    }

    // Reset error
    setError(null);

    try {
      if (!isLoadMore) setLoading(true);
      else setLoadingMore(true);

      const currentOffset = isLoadMore ? offset : 0;
      const limit = 20;

      const results = await searchItems(keyword, limit, currentOffset);

      if (results.length < limit) setHasMore(false);
      else setHasMore(true);

      if (isLoadMore) {
        setItems((prev) => [...prev, ...results]);
        setOffset((prev) => prev + limit);
      } else {
        setItems(results);
        setOffset(limit);
      }
    } catch (err) {
      console.error("Failed to search items:", err);
      setError("検索に失敗しました");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [keyword, offset]);

  // Initial search when keyword changes
  useEffect(() => {
    performSearch(false);
  }, [keyword, performSearch]);

  const handleLoadMore = () => {
    performSearch(true);
  };

  // フィルターとソートを適用
  const filteredAndSortedItems = useMemo(() => {
    let result = [...items];

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
  }, [items, statusFilter, sortOption]);

  if (!keyword) {
    return (
      <div className="container-lg">
        <p className={styles.message}>検索キーワードを入力してください</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container-lg">
        <p className="center-text">検索中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-lg">
        <p className={styles.error}>{error}</p>
      </div>
    );
  }

  return (
    <div className="container-lg">
      <h1 className={styles.title}>「{keyword}」の検索結果</h1>
      <p className={styles.count}>
        {filteredAndSortedItems.length}件の商品が見つかりました
      </p>

      <div className={styles.contentWrapper}>
        {/* 左側: フィルター・ソート */}
        <aside className={styles.sidebar}>
          {/* ステータスフィルター */}
          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>表示</h3>
            <label className={styles.filterOption}>
              <input
                type="radio"
                id="search-status-all"
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
                id="search-status-onsale"
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
                id="search-sort-newest"
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
                id="search-sort-price-low"
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
                id="search-sort-price-high"
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
          {filteredAndSortedItems.length === 0 ? (
            <p className={styles.message}>該当する商品はありません</p>
          ) : (
            <>
              <ItemGrid
                items={filteredAndSortedItems}
                likedItemIds={likedItemIds}
                onLikeClick={toggleLike}
                checkIsLiked={checkIsLiked}
              />
              
              {hasMore && (
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

export default SearchPage;
