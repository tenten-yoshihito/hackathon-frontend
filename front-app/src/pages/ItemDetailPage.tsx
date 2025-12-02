// src/pages/ItemDetailPage.tsx

import React from "react";
import { useParams } from "react-router-dom";
import { useItemDetail } from "hooks/useItemDetail";

// 🧩 部品たち
import ImageCarousel from "components/items/ImageCarousel";
import ItemDescription from "components/items/ItemDescription";
import ItemDetailFooter from "components/items/ItemDetailFooter";

import styles from "./ItemDetailPage.module.css";

const ItemDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // ロジックはフックに任せる
  const { item, loading, error } = useItemDetail(id);

  if (loading) return <p className="center-text">読み込み中...</p>;
  if (error || !item)
    return <p className="center-text">商品が見つかりません</p>;

  return (
    <div
      className="container-lg"
      style={{ backgroundColor: "#fff", minHeight: "100vh" }}
    >
      {/* 2カラムレイアウト (PC時) */}
      <div className={styles.contentWrapper}>
        {/* 左: 画像 */}
        <div className={styles.imageSection}>
          <ImageCarousel images={item.image_urls} alt={item.name} />
        </div>

        {/* 右: 説明 */}
        <div className={styles.infoSection}>
          <ItemDescription item={item} />

          {/* フッターに隠れないための余白 */}
          <div className={styles.spacer} />
        </div>
      </div>

      {/* 下: フッター */}
      <ItemDetailFooter />
    </div>
  );
};

export default ItemDetailPage;
