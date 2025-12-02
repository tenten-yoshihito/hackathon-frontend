import React from "react";
import { ItemDetail } from "lib/api/item_detail";
import styles from "./ItemDescription.module.css";

interface Props {
  item: ItemDetail;
}

const ItemDescription: React.FC<Props> = ({ item }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.name}>{item.name}</h1>

      <div className={styles.price}>
        ¥{item.price.toLocaleString()}
        <span className={styles.tax}>(税込) 送料込み</span>
      </div>

      <hr className={styles.divider} />

      <div>
        <h3 className={styles.descTitle}>商品の説明</h3>
        <p className={styles.descText}>
          {item.description || "説明はありません"}
        </p>
      </div>
    </div>
  );
};

export default ItemDescription;