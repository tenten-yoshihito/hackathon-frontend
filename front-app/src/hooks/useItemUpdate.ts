// src/hooks/useItemUpdate.ts

import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateItem } from "lib/api/item_update";

export const useItemUpdate = (itemId: string | undefined) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    e: FormEvent,
    name: string,
    price: string,
    description: string
  ) => {
    e.preventDefault();

    if (!itemId) {
      alert("商品IDが見つかりません");
      return;
    }

    setIsLoading(true);
    try {
      await updateItem(itemId, {
        name,
        price: parseInt(price),
        description,
      });

      alert("商品を更新しました！");
      navigate(`/items/${itemId}`);
    } catch (err: any) {
      console.error(err);
      alert(err.message || "更新に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSubmit, isLoading };
};
