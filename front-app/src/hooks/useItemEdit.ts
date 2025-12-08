// src/hooks/useItemEdit.ts

import { useEffect } from "react";
import { useItemDetail } from "./useItemDetail";
import { useItemCreate } from "./useItemCreate";
import { useItemUpdate } from "./useItemUpdate";

export const useItemEdit = (itemId: string | undefined) => {
  const { item, loading, error } = useItemDetail(itemId);
  const formProps = useItemCreate();
  const { handleSubmit: handleUpdate, isLoading: isUpdating } = useItemUpdate(itemId);

  // 既存データでフォームを事前入力
  useEffect(() => {
    if (item) {
      formProps.setName(item.name);
      formProps.setPrice(item.price.toString());
      formProps.setDescription(item.description || "");
      
      // 既存の画像URLをプレビューとして設定
      if (item.image_urls && item.image_urls.length > 0) {
        formProps.setPreviews(item.image_urls);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item, formProps.setName, formProps.setPrice, formProps.setDescription, formProps.setPreviews]);

  // onSubmitを更新用に上書き
  const onSubmit = (e: React.FormEvent) => {
    handleUpdate(e, formProps.name, formProps.price, formProps.description);
  };

  return {
    item,
    loading,
    error,
    formProps: {
      ...formProps,
      onSubmit, // 更新用のonSubmitで上書き
      isLoading: isUpdating, // 更新中のローディング状態
    },
  };
};
