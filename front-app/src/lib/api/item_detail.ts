// src/lib/api/item_detail.ts

import { getBaseUrl } from "./client";

export interface ItemDetail {
  id: string;
  user_id: string;
  name: string;
  price: number;
  description: string;
  image_urls: string[];
  status: string;
  created_at: string;
  // 将来的に seller_name, seller_icon などを追加可能
}

export const getItemDetail = async (id: string): Promise<ItemDetail> => {
  const res = await fetch(`${getBaseUrl()}/items/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("商品詳細の取得に失敗しました");
  }

  return res.json();
};
