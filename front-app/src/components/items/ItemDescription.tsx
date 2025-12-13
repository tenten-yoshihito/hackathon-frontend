import React from "react";
import { Link } from "react-router-dom";
import { ItemDetail } from "lib/api/item_detail";
import { DEFAULT_USER_ICON } from "constants/images";
import styles from "./ItemDescription.module.css";

interface ItemDescriptionProps {
  item: ItemDetail;
}

const ItemDescription: React.FC<ItemDescriptionProps> = ({ item }) => {
  return (
    <div className={styles.container}>
      {/* 出品者情報 */}
      <div className={styles.sellerSection}>
        <h3 className={styles.sectionTitle}>出品者</h3>
        <Link to={`/users/${item.user_id}`} className={styles.sellerLink}>
          <img
            src={item.seller_icon_url || DEFAULT_USER_ICON}
            alt={item.seller_name}
            className={styles.sellerIcon}
            key={item.seller_icon_url} // Force re-render when icon changes
          />
          <span className={styles.sellerName}>{item.seller_name}</span>
        </Link>
      </div>

      {/* 商品説明 */}
      <div className={styles.descriptionSection}>
        <h3 className={styles.sectionTitle}>商品の説明</h3>
        <p className={styles.description}>{item.description || "説明なし"}</p>
      </div>
    </div>
  );
};

export default ItemDescription;