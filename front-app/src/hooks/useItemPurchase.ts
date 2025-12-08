// src/hooks/useItemPurchase.ts

import { useState } from "react";
import { purchaseItem } from "lib/api/purchase";
import { ItemDetail } from "lib/api/item_detail";

interface UseItemPurchaseProps {
  item: ItemDetail | null;
  refetch: () => void;
}

export const useItemPurchase = ({ item, refetch }: UseItemPurchaseProps) => {
  const [showModal, setShowModal] = useState(false);
  const [purchasing, setPurchasing] = useState(false);

  const handlePurchaseClick = () => {
    setShowModal(true);
  };

  const handleConfirmPurchase = async () => {
    if (!item) return;
    
    setPurchasing(true);
    try {
      await purchaseItem(item.id);
      alert("購入が完了しました!");
      refetch(); // 商品情報を再取得してSOLD表示を更新
      setShowModal(false);
    } catch (err: any) {
      alert(err.message || "購入に失敗しました");
    } finally {
      setPurchasing(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return {
    showModal,
    purchasing,
    handlePurchaseClick,
    handleConfirmPurchase,
    closeModal,
  };
};
