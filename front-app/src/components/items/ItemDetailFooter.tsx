import React from "react";
import styles from "./ItemDetailFooter.module.css";

interface Props {
  onPurchaseClick?: () => void;
  onEditClick?: () => void;
  isSold?: boolean;
  isOwnItem?: boolean;
}

const ItemDetailFooter: React.FC<Props> = ({
  onPurchaseClick,
  onEditClick,
  isSold = false,
  isOwnItem = false
}) => {
  // 自分の商品の場合はコメント + 編集ボタン
  if (isOwnItem) {
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
            className={`primary-button ${styles.editButton}`}
            onClick={onEditClick || (() => alert("編集機能へ"))}
            disabled={isSold}
          >
            {isSold ? "売却済み" : "✏️ 編集"}
          </button>
        </div>
      </div>
    );
  }

  // 他人の商品の場合は従来通り
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