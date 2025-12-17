// src/components/items/ItemGrid.tsx

import React from "react";
import { Link } from "react-router-dom";
import { ItemSimple } from "lib/api/item_list";
import LikeButton from "components/common/LikeButton";
import styles from "./ItemGrid.module.css";

interface Props {
  items: ItemSimple[];
  likedItemIds?: Set<string>;
  onLikeClick?: (itemId: string) => void;
  checkIsLiked?: (itemId: string) => boolean;
}

const ItemGrid: React.FC<Props> = ({
  items,
  likedItemIds,
  onLikeClick,
  checkIsLiked,
}) => {
  if (items.length === 0) {
    return <div className="empty-message">出品されている商品はありません</div>;
  }

  const handleLikeClick = (e: React.MouseEvent, itemId: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (onLikeClick) {
      onLikeClick(itemId);
    }
  };

  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <Link
          to={`/items/${item.id}`}
          key={item.id}
          className={styles.cardLink}
        >
          <div className={styles.card}>
            {/* 画像エリア */}
            <div className={styles.imageWrapper}>
              {item.status === "SOLD" && <div className="sold-badge">SOLD</div>}
              {item.image_url ? (
                <img
                  src={item.image_url}
                  alt={item.name}
                  className={styles.image}
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className={styles.noImage}>No Image</div>
              )}
              
              {/* いいねボタン */}
              {onLikeClick && checkIsLiked && (
                <div className={styles.likeButtonWrapper}>
                  <LikeButton
                    isLiked={checkIsLiked(item.id)}
                    onClick={(e) => handleLikeClick(e, item.id)}
                  />
                </div>
              )}
            </div>

            {/* 情報エリア */}
            <div className={styles.info}>
              <div className={styles.price}>¥{item.price.toLocaleString()}</div>
              <div className={styles.name}>{item.name}</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ItemGrid;
