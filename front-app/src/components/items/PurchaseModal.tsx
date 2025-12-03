// src/components/items/PurchaseModal.tsx

import React from "react";
import styles from "./PurchaseModal.module.css";

interface Props {
  item: {
    id: string;
    name: string;
    price: number;
    image_urls: string[];
  };
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

const PurchaseModal: React.FC<Props> = ({ item, onConfirm, onCancel, isLoading }) => {
  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>購入確認</h2>
        
        <div className={styles.content}>
          {item.image_urls && item.image_urls.length > 0 && (
            <img 
              src={item.image_urls[0]} 
              alt={item.name} 
              className={styles.image}
            />
          )}
          
          <div className={styles.info}>
            <p className={styles.itemName}>{item.name}</p>
            <p className={styles.price}>¥{item.price.toLocaleString()}</p>
          </div>
        </div>

        <p className={styles.confirmText}>
          この商品を購入しますか?
        </p>

        <div className={styles.buttons}>
          <button 
            className={`secondary-button ${styles.button}`}
            onClick={onCancel}
            disabled={isLoading}
          >
            キャンセル
          </button>
          <button 
            className={`primary-button ${styles.button}`}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "処理中..." : "購入する"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;
