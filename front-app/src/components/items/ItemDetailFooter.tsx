import React from "react";
import styles from "./ItemDetailFooter.module.css";

interface Props {
  onPurchaseClick?: () => void;
  isSold?: boolean;
}

const ItemDetailFooter: React.FC<Props> = ({ onPurchaseClick, isSold = false }) => {
  return (
    <div className={styles.footer}>
      <div className={styles.content}>
        <button
          className={`secondary-button ${styles.commentButton}`}
          onClick={() => alert("チャット機能へ")}
        >
          コメント
        </button>
        <button
          className={`primary-button ${styles.purchaseButton}`}
          onClick={onPurchaseClick || (() => alert("購入機能へ"))}
          disabled={isSold}
        >
          {isSold ? "売り切れ" : "購入手続きへ"}
        </button>
      </div>
    </div>
  );
};

export default ItemDetailFooter;