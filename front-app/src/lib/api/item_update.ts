// src/lib/api/item_update.ts

import { getIdToken } from "../firebaseConfig";
import { getBaseUrl } from "./client";

export interface ItemUpdateData {
  name: string;
  price: number;
  description: string;
  image_urls: string[];
}

export const updateItem = async (itemId: string, data: ItemUpdateData): Promise<void> => {
  const token = await getIdToken();

  console.log("Update request:", { itemId, data }); // デバッグ用

  const response = await fetch(`${getBaseUrl()}/items/${itemId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  console.log("Update response status:", response.status); // デバッグ用

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error("Update error:", errorData); // デバッグ用
    throw new Error(errorData.error || "商品の更新に失敗しました");
  }

  return response.json();
};
