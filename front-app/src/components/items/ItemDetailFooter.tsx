import React from "react";
import styles from "./ItemDetailFooter.module.css";

// 将来的には onBuy などの関数をPropsで受け取る
const ItemDetailFooter: React.FC = () => {
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
          onClick={() => alert("購入機能へ")}
        >
          購入手続きへ
        </button>
      </div>
    </div>
  );
};

export default ItemDetailFooter;