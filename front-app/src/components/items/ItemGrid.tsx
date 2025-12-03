// src/components/items/ItemGrid.tsx

import React from "react";
import { Link } from "react-router-dom";
import { ItemSimple } from "lib/api/item_list";
import styles from "./ItemGrid.module.css";

interface Props {
  items: ItemSimple[];
}

const ItemGrid: React.FC<Props> = ({ items }) => {
  if (items.length === 0) {
    return <div className="empty-message">出品されている商品はありません</div>;
  }

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
                />
              ) : (
                <div className={styles.noImage}>No Image</div>
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
