import React from "react";
import styles from "./ItemDetailFooter.module.css";

// 将来的には onBuy などの関数をPropsで受け取る
const ItemDetailFooter: React.FC = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.content}>
        <button
          className="secondary-button"
          style={{ flex: 1 }}
          onClick={() => alert("チャット機能へ")}
        >
          コメント
        </button>
        <button
          className="primary-button"
          style={{ marginTop: 0, flex: 2 }}
          onClick={() => alert("購入機能へ")}
        >
          購入手続きへ
        </button>
      </div>
    </div>
  );
};

export default ItemDetailFooter;