// src/pages/ItemEditPage.tsx

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useItemEdit } from "hooks/useItemEdit";
import ItemCreateForm from "components/items/ItemCreateForm";
import styles from "./ItemEditPage.module.css";

const ItemEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { item, loading, error, formProps } = useItemEdit(id);

  if (loading) return <p className="center-text">読み込み中...</p>;
  
  if (error || !item) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>商品が見つかりません</p>
      </div>
    );
  }

  // 売却済みの商品は編集不可
  if (item.status === "SOLD") {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>売却済みの商品は編集できません</p>
        <button 
          className={`secondary-button ${styles.backButton}`}
          onClick={() => navigate(`/items/${id}`)}
        >
          商品詳細に戻る
        </button>
      </div>
    );
  }

  return <ItemCreateForm {...formProps} mode="edit" />;
};

export default ItemEditPage;
