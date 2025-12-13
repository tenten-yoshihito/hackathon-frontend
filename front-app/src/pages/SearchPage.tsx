// src/pages/SearchPage.tsx

import React, { useEffect, useState, useMemo } from "react";
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
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const { likedItemIds, toggleLike, checkIsLiked } = useLikes();

  useEffect(() => {
    const loadSearchResults = async () => {
      if (!keyword) {
        setLoading(false);
        return;
      }

      // エラー状態をリセット
      setError(null);

      try {
        setLoading(true);
        const results = await searchItems(keyword);
        setItems(results);
      } catch (err) {
        console.error("Failed to search items:", err);
        setError("検索に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    loadSearchResults();
  }, [keyword]);

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
          {filteredAndSortedItems.length === 0 ? (
            <p className={styles.message}>該当する商品はありません</p>
          ) : (
            <ItemGrid
              items={filteredAndSortedItems}
              likedItemIds={likedItemIds}
              onLikeClick={toggleLike}
              checkIsLiked={checkIsLiked}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default SearchPage;
