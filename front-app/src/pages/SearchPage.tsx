// src/pages/SearchPage.tsx

import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchItems } from "lib/api/item_list";
import { ItemSimple } from "types/item";
import { useLikes } from "hooks/useLikes";
import ItemGrid from "components/items/ItemGrid";
import styles from "./SearchPage.module.css";

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("name") || "";
  const [items, setItems] = useState<ItemSimple[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { likedItemIds, toggleLike, checkIsLiked } = useLikes();

  useEffect(() => {
    const loadSearchResults = async () => {
      if (!keyword) {
        setLoading(false);
        return;
      }

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
      {items.length === 0 ? (
        <p className={styles.message}>該当する商品はありません</p>
      ) : (
        <>
          <p className={styles.count}>{items.length}件の商品が見つかりました</p>
          <ItemGrid
            items={items}
            likedItemIds={likedItemIds}
            onLikeClick={toggleLike}
            checkIsLiked={checkIsLiked}
          />
        </>
      )}
    </div>
  );
};

export default SearchPage;
